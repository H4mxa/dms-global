import {call, put, takeLatest} from 'redux-saga/effects';
import {tweetActions} from './';
import {TweetsService} from '@services/tweets';
import {ITimeline} from './types';

function* watchGetTweetsProcess(action: any): any {
  try {
    const {pageNumber} = action.payload;
    const results = yield call(TweetsService.fetchTweets, pageNumber);

    // in response I am not getting Status Code!!!!
    if (results?.data?.data) {
      yield put(
        tweetActions.processGetTweetsSuccess(results.data as ITimeline),
      );
    } else {
      yield put(tweetActions.processGetTweetsFailed());
    }
  } catch (error) {
    console.error(error);
  }
}

function* watchLoadMoreTweetsProcess(action: any): any {
  try {
    const {pageNumber} = action.payload;
    const results = yield call(TweetsService.fetchTweets, pageNumber);

    // in response I am not getting Status Code!!!!
    if (results?.data?.data) {
      yield put(
        tweetActions.processLoadMoreTweetsSuccess(results.data as ITimeline),
      );
    } else {
      yield put(tweetActions.processLoadMoreTweetsFailed());
    }
  } catch (error) {
    console.error(error);
  }
}

export default function* rootSaga() {
  yield takeLatest(tweetActions.processGetTweets.type, watchGetTweetsProcess);
  yield takeLatest(
    tweetActions.processLoadMoreTweets.type,
    watchLoadMoreTweetsProcess,
  );
}
