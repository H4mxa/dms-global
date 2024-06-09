import {useDidMount, useEventCallback} from '@common/hooks';
import {dispatch} from '@common/redux';
import {selectIsFetching} from '@redux/login/selector';
import {tweetActions} from '@redux/tweets';
import {selectTimelineFeeds} from '@redux/tweets/selector';
import {useRef} from 'react';
import {useSelector} from 'react-redux';
import {tweetActionTypes} from '../types';

export const useTweets = () => {
  // selectors
  const getIsFetching = useSelector(selectIsFetching);
  const getTimelineFeeds = useSelector(selectTimelineFeeds);

  // ref
  const isMounted = useRef(false);
  const pageOffset = useRef(1);

  // effect
  useDidMount(() => {
    if (!isMounted.current) {
      getLatestTweets();

      isMounted.current = true;
    }
  });

  // Methods
  const getLatestTweets = useEventCallback(() => {
    dispatch(
      tweetActions.processGetTweets({
        pageNumber: 1,
      } as any),
    );
  });

  const loadMoreTweets = useEventCallback(() => {
    pageOffset.current++;
    dispatch(
      tweetActions.processLoadMoreTweets({
        pageNumber: pageOffset.current,
      } as any),
    );
  });

  const handleTweetActions = useEventCallback((eventType: tweetActionTypes) => {
    switch (eventType) {
      case 'like':
        console.log(eventType);
        break;
      case 'comment':
        console.log(eventType);
        break;
      case 'retweet':
        console.log(eventType);
        break;
      case 'share':
        console.log(eventType);
        break;
    }
  });

  const tweetMethods = {
    getLatestTweets,
    loadMoreTweets,
    handleTweetActions,
  };

  return {
    tweetMethods,
    isLoading: getIsFetching,
    timelineFeeds: getTimelineFeeds,
  };
};
