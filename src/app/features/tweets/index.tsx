import {Text} from '@rn-core';
import React, {memo, useCallback} from 'react';
import isEqual from 'react-fast-compare';
import {useStyles} from 'react-native-unistyles';
import Hyperlink from 'react-native-hyperlink';
import {format} from 'date-fns';

import {TweetsSection} from './components/tweets-section';
import {useTweets} from './hooks/useTweets';
import {execFunc} from '@common/method';
import {ActivityIndicator, FlatList} from 'react-native';
import {customLinkify} from './utils';

const TweetsComponent = () => {
  // theme
  const {theme} = useStyles();

  // hooks
  const {isLoading, tweetMethods, timelineFeeds} = useTweets();

  const generateTwitterText = useCallback(
    (text: any) => {
      return (
        <Hyperlink
          linkify={customLinkify}
          linkStyle={{color: theme.color.primary, fontWeight: '400'}}>
          {text}
        </Hyperlink>
      );
    },
    [theme.color.primary],
  );

  const renderFooter = useCallback(() => {
    if (!isLoading) return null;
    return <ActivityIndicator style={{marginVertical: 20}} />;
  }, [isLoading]);

  const keyExtractor = useCallback(({id}: {id: string}) => id, []);

  // render
  return (
    <FlatList
      data={timelineFeeds}
      showsVerticalScrollIndicator={false}
      initialNumToRender={10}
      renderItem={({item, index}) => {
        const date = new Date(item.created_at);
        const hourMinute = format(date, 'HH:mm');

        if (index === 0) console.log('item: ', item);

        const tweetText = generateTwitterText(
          <Text
            style={{
              fontSize: 16,
              fontWeight: '400',
              fontFamily: 'HelveticaNeue',
            }}>
            {index == 2
              ? item.text + '\n@DMS_GLOBAL' + '   #hello_world'
              : item.text}
          </Text>,
        );

        return (
          <TweetsSection
            firstName={item.user.first_name}
            companyName={item.user.company_name}
            profileImageUrl={item.user.profile_image_url}
            likes_count={item.likes_count}
            hourMinute={hourMinute}
            tweetText={tweetText}
            onPress={eventType =>
              execFunc(tweetMethods.handleTweetActions, eventType)
            }
          />
        );
      }}
      ListFooterComponent={renderFooter}
      keyExtractor={keyExtractor}
      onRefresh={() => execFunc(tweetMethods.getLatestTweets)}
      refreshing={isLoading}
      onEndReachedThreshold={0.5}
      onEndReached={() => execFunc(tweetMethods.loadMoreTweets)}
    />
  );
};

export const Tweets = memo(TweetsComponent, isEqual);
