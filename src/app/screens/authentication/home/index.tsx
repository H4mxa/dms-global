import React, {memo} from 'react';
import isEqual from 'react-fast-compare';
import {View} from '@rn-core';
import {Screen} from '@components/screen';
import {Tweets} from '@features/tweets';

import {useStyles} from 'react-native-unistyles';
import {sizeScale} from '@common/scale';

const HomeComponent = () => {
  const {theme} = useStyles();

  // render
  return (
    <Screen
      bottomInsetColor="transparent"
      excludeEdges={['top', 'bottom']}
      statusBarStyle={theme.type == 'dark' ? 'light-content' : 'dark-content'}
      style={{
        flex: 1,
        marginTop: sizeScale(8),
        paddingHorizontal: sizeScale(8),
      }}
      backgroundColor={'transparent'}>
      <View>
        <Tweets />
      </View>
    </Screen>
  );
};

export const HomeScreen = memo(HomeComponent, isEqual);
