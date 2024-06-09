import React, {memo} from 'react';
import isEqual from 'react-fast-compare';
import {View, Text} from '@rn-core';
import {Screen} from '@components/screen';

const HomeComponent = () => {
  // render
  return (
    <Screen
      bottomInsetColor="transparent"
      scroll
      excludeEdges={['top', 'bottom']}
      statusBarStyle="dark-content"
      style={{paddingVertical: 0, paddingHorizontal: 10}}
      backgroundColor={'transparent'}>
      <View>
        <Text>Home Screen</Text>
      </View>
    </Screen>
  );
};

export const HomeScreen = memo(HomeComponent, isEqual);
