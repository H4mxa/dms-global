import {call, put, takeLatest} from 'redux-saga/effects';
import {tweetActions} from './';
import {TweetsService} from '@services/tweets';
import {ITimeline} from './types';
import {showSnack} from '@components/snack-bar';

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
      showSnack({
        msg: 'Something Went Wrong',
        type: 'error',
      });
      yield put(tweetActions.processLoadMoreTweetsFailed());
    }
  } catch (error) {
    showSnack({
      msg: 'Something Went Wrong',
      type: 'error',
    });
    console.error(error);
  }
}

function* watchLikeTweetProcess(action: any): any {
  try {
    const {postId} = action.payload;
    const results = yield call(TweetsService.likeTweet, postId);

    if (results.status >= 200 && results.status < 300) {
      yield put(tweetActions.processLikeTweetSucess());
    } else {
      showSnack({
        msg: 'Something Went Wrong',
        type: 'error',
      });

      yield put(tweetActions.processLikeTweetFailed());
    }
  } catch (error) {
    showSnack({
      msg: 'Something Went Wrong ',
      type: 'error',
    });
    console.error(error);
  }
}

function* watchUnLikeTweetProcess(action: any): any {
  try {
    const {postId} = action.payload;
    const results = yield call(TweetsService.likeTweet, postId);

    if (results.status >= 200 && results.status < 300) {
      yield put(tweetActions.processUnLikeTweetSucess());
    } else {
      showSnack({
        msg: 'Something Went Wrong',
        type: 'error',
      });
      yield put(tweetActions.processUnLikeTweetFailed());
    }
  } catch (error) {
    showSnack({
      msg: 'Something Went Wrong',
      type: 'error',
    });
    console.error(error);
  }
}

export default function* rootSaga() {
  yield takeLatest(tweetActions.processGetTweets.type, watchGetTweetsProcess);
  yield takeLatest(tweetActions.processLikeTweet.type, watchLikeTweetProcess);
  yield takeLatest(
    tweetActions.processUnLikeTweet.type,
    watchUnLikeTweetProcess,
  );
  yield takeLatest(
    tweetActions.processLoadMoreTweets.type,
    watchLoadMoreTweetsProcess,
  );
}
