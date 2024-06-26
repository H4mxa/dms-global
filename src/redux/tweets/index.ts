import {createSlice} from '@reduxjs/toolkit';
import {ITimeline, ITweets} from './types';
import {SLICE_NAME} from '@common/constant';

const initialState: ITweets = {
  isFetching: false,
  likeLoader: false,
  tweets: null,
  totalPages: null,
  totalPosts: null,
};

const slice = createSlice({
  name: SLICE_NAME.TWEETS,
  initialState,
  reducers: {
    processGetTweets: state => {
      state.isFetching = true;
    },
    processGetTweetsSuccess: (state, actions: {payload: ITimeline}) => {
      state.isFetching = false;
      state.tweets = actions.payload.data;
      state.totalPages = actions.payload.totalPages;
      state.totalPosts = actions.payload.totalPosts;
    },
    processGetTweetsFailed: state => {
      state.isFetching = false;
    },

    processLoadMoreTweets: state => {
      state.isFetching = true;
    },
    processLoadMoreTweetsSuccess: (state, actions) => {
      state.isFetching = false;
      if (state.tweets) {
        state.tweets = [...state.tweets, ...actions.payload.data];
      }
      state.totalPages = actions.payload.totalPages;
      state.totalPosts = actions.payload.totalPosts;
    },
    processLoadMoreTweetsFailed: state => {
      state.isFetching = false;
    },

    processLikeTweet: state => {
      state.likeLoader = true;
    },
    processLikeTweetSucess: state => {
      state.likeLoader = false;
    },
    processLikeTweetFailed: state => {
      state.likeLoader = false;
    },
    processUnLikeTweet: state => {
      state.likeLoader = true;
    },
    processUnLikeTweetSucess: state => {
      state.likeLoader = false;
    },
    processUnLikeTweetFailed: state => {
      state.likeLoader = false;
    },
  },
});

export const {actions: tweetActions, reducer} = slice;

export default slice.reducer;
