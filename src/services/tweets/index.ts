import {BASE_URL} from '@config';
import {API_URLS} from './apiConstants';
import {MMKV_KEY} from '@common/constant';
import {loadString} from '@helper/storage-handlers';
import request from '@request';

export const TweetsService = {
  fetchTweets: (pageNumber: number) => {
    const url = `${BASE_URL}${API_URLS.TIMELINE(pageNumber)}`;
    const token = loadString(MMKV_KEY.APP_TOKEN);
    const options: any = {
      method: 'GET',
      contentType: 'application/json',
      token,
    };

    return request(url, null, options);
  },
  likeTweet: (postId: number) => {
    const url = `${BASE_URL}${API_URLS.LIKE_TWEET}`;
    const token = loadString(MMKV_KEY.APP_TOKEN);
    const body = {
      post_id: postId,
    };
    const options: any = {
      method: 'POST',
      contentType: 'application/json',
      token,
    };
    return request(url, body, options);
  },

  UnlikeTweet: (postId: number) => {
    const url = `${BASE_URL}${API_URLS.UNLIKE_TWEET}`;
    const token = loadString(MMKV_KEY.APP_TOKEN);
    const body = {
      post_id: postId,
    };
    const options: any = {
      method: 'POST',
      contentType: 'application/json',
      token,
    };
    return request(url, body, options);
  },
};
