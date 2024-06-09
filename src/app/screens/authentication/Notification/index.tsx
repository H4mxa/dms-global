import React, {memo} from 'react';
import isEqual from 'react-fast-compare';
import {View, Text} from '@rn-core';
import {Screen} from '@components/screen';

const NotificationsComponent = () => {
  // render

  return (
    <Screen
      bottomInsetColor="transparent"
      scroll
      excludeEdges={['bottom', 'top']}
      statusBarStyle="dark-content"
      style={{paddingVertical: 0, paddingHorizontal: 10}}
      backgroundColor={'transparent'}>
      <View>
        <Text>Notifications Screen</Text>
      </View>
    </Screen>
  );
};

export const NotificationsScreen = memo(NotificationsComponent, isEqual);
