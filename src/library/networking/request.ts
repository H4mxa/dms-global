import ERROR_CODES from './error-codes';
import {removeAll} from '@helper/storage-handlers';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
const parseAndBuildJSONResponse = async (response: any) => {
  if (response.error === 'internal_server_error') {
    return response;
  }

  let newResponse: any = {};

  const parsedJSON = await response.json();

  if (parsedJSON && parsedJSON.status) {
    if (
      parsedJSON.status === 'finished' ||
      parsedJSON.status === 'failed' ||
      parsedJSON.status === 'downloading'
    ) {
      parsedJSON.video = {};
      parsedJSON.video.status = parsedJSON.status;
    }
  }

  if (parsedJSON) {
    newResponse.statusText = response.statusText;
  }
  if (parsedJSON) {
    newResponse.streamRead = true;
  }

  if (Array.isArray(parsedJSON)) {
    newResponse.data = parsedJSON;
    return newResponse;
  }
  newResponse.data = parsedJSON;

  const responseWithHeaders = {
    ...newResponse,
    headers: response.headers.map,
  };
  return responseWithHeaders;
};

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */

// Todo: Refactor this part when all error codes are implemented
const processResponse = async (response: any) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else if (response.status === 401) {
    // if we have token invalid errors
    const parsedJSON = await parseAndBuildJSONResponse(response);
    if (parsedJSON) {
      if (parsedJSON.data.errorCode) {
        // we redirect user to sign in page
        switch (parsedJSON.data.errorCode) {
          case ERROR_CODES.TOKEN_EXPIRED_ERROR:
            break;

          default:
            // in case if its its token error code
            // send response back
            return parsedJSON;
        }
        /* Check if uri was our api backend */
        if (response.url.indexOf('/authenticate') === -1) {
          console.warn('invalid token', JSON.stringify(response.url));
          removeAll();
        }
      }
      return parsedJSON;
    }
  }

  return response;
};

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [data]    The data we want to pass to 'fetch'
 * @param  {object} [options] The options we want to pass to 'fetch'
 *
 * @return {object}           The response data
 */
export default async function request(
  url: RequestInfo,
  data: any,
  options: {
    hasOwnProperty: (arg0: string) => any;
    contentType: string;
    token: any;
    authorization: any;
    headers: {
      [x: string]: any;
      hasOwnProperty: (arg0: string) => any;
      Accept: any;
      api_version: any;
    };
    method: string;
    mode: any;
  },
) {
  const header: any = {};
  let method = '';
  if (options) {
    if (options.hasOwnProperty('contentType')) {
      header['Content-Type'] = options.contentType;
    }

    if (options.hasOwnProperty('token')) {
      header.Authorization = `Bearer ${options.token}`;
    }
  }

  if (options.headers) {
    if (options.headers.Accept) {
      header.Accept = options.headers.Accept;
    }
    if (options.headers.api_version) {
      header.api_version = options.headers.api_version;
    }
  }

  if (options && options.hasOwnProperty('method')) {
    method = options.method;
  } else {
    method = 'POST';
  }

  const headerObject: any = {
    method,
    headers: header,
  };

  if (options.hasOwnProperty('mode')) {
    headerObject.mode = options.mode;
  }

  if (
    data &&
    options &&
    options.hasOwnProperty('contentType') &&
    options.contentType === 'application/json'
  ) {
    console.log('data', data);
    headerObject.body = JSON.stringify(data);
  } else if (data) {
    headerObject.body = data;
  }

  if (options.contentType === 'application/json') {
    if (options.method === 'DELETE') {
      const response = await fetch(url, headerObject);
      console.log('response status', response);
      const processedResponse: any = await processResponse(response);
      if (
        processedResponse &&
        !(processedResponse.status >= 200 && processedResponse.status < 300)
      ) {
        const parsedJsonResponse = await parseAndBuildJSONResponse(
          processedResponse,
        );
        return parsedJsonResponse;
      }
      return processedResponse;
    }

    const response = await fetch(url, headerObject);

    const processedResponse = await processResponse(response);
    if (processedResponse && !processedResponse.streamRead) {
      try {
        const parsedJsonResponse = await parseAndBuildJSONResponse(
          processedResponse,
        );
        console.log('response json', parsedJsonResponse);
        return parsedJsonResponse;
      } catch (e) {
        console.warn(e);
      }
    }
    return processedResponse;
  }
  const response = await fetch(url, headerObject);
  const processedResponse = await processResponse(response);
  console.log('response json', processedResponse);
  return processedResponse;
}
