import React, {memo} from 'react';
import isEqual from 'react-fast-compare';
import {View, Text} from '@rn-core';
import {Screen} from '@components/screen';

const SettingsComponent = () => {
  // render

  return (
    <Screen
      bottomInsetColor="transparent"
      scroll
      excludeEdges={'all'}
      statusBarStyle="dark-content"
      style={{paddingVertical: 0, paddingHorizontal: 10}}
      backgroundColor={'transparent'}>
      <View>
        <Text>Settings Screen</Text>
      </View>
    </Screen>
  );
};

export const SettingsScreen = memo(SettingsComponent, isEqual);
