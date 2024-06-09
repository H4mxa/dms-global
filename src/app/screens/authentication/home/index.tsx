import React, {memo} from 'react';
import isEqual from 'react-fast-compare';
import {View} from '@rn-core';
import {Screen} from '@components/screen';
import {Tweets} from '@features/tweets';

const HomeComponent = () => {
  // render
  return (
    <Screen
      bottomInsetColor="transparent"
      excludeEdges={['top', 'bottom']}
      statusBarStyle="dark-content"
      style={{paddingVertical: 0, paddingHorizontal: 10}}
      backgroundColor={'transparent'}>
      <View>
        <Tweets />
      </View>
    </Screen>
  );
};

export const HomeScreen = memo(HomeComponent, isEqual);
