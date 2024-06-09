import {createSelector} from '@reduxjs/toolkit';
import {RootState} from 'src/store/AllReducers';

export const selectIsFetching = createSelector(
  (state: RootState) => state.tweets,
  tweets => tweets.isFetching,
);

export const selectTimelineFeeds = createSelector(
  (state: RootState) => state.tweets,
  tweets => tweets.tweets,
);
