import {Screen} from '@components/screen';
import {Text, View} from '@rn-core';
import React from 'react';

export const Login = () => {
  return (
    <Screen
      bottomInsetColor="transparent"
      scroll
      excludeEdges={['bottom']}
      statusBarStyle="dark-content"
      style={{paddingVertical: 0, paddingHorizontal: 10}}
      backgroundColor={'transparent'}>
      <View>
        <Text>Login</Text>
      </View>
    </Screen>
  );
};
