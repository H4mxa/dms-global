import {Screen} from '@components/screen';
import {navigateScreen} from '@navigation/navigation-service';
import {APP_SCREEN} from '@navigation/screen-types';
import {Text, View} from '@rn-core';
import React from 'react';

import {useStyles} from 'react-native-unistyles';
import {styleSheet} from '../login/styles';
import {FormRegister} from './components/FormRegister';
import {TouchableOpacity} from 'react-native';

export const Register = () => {
  const {styles} = useStyles(styleSheet);

  return (
    <Screen
      excludeEdges={['bottom']}
      statusBarStyle="dark-content"
      unsafe={true}>
      <View style={styles.container}>
        <FormRegister />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 12,
          }}>
          <Text style={[styles.registerText]}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigateScreen(APP_SCREEN.LOGIN)}>
            <Text style={styles.registerTextLink}> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
};
