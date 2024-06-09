import {Screen} from '@components/screen';
import {Text, View} from '@rn-core';
import React from 'react';
import {FormLogin} from './components/FormLogin';
import {useLogin} from './hooks/useLogin';
import {execFunc} from '@common/method';
import {useStyles} from 'react-native-unistyles';
import {styleSheet} from './styles';
import {TouchableOpacity} from 'react-native';
import {navigateScreen} from '@navigation/navigation-service';
import {APP_SCREEN} from '@navigation/screen-types';

export const Login = () => {
  const {isLoading, loginMethods} = useLogin();

  const {styles} = useStyles(styleSheet);

  return (
    <Screen
      excludeEdges={['bottom']}
      statusBarStyle="dark-content"
      unsafe={true}>
      <View style={styles.container}>
        <FormLogin
          isLoading={isLoading}
          onSubmit={data => execFunc(loginMethods.onSubmitLogin, data)}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 12,
          }}>
          <Text style={styles.registerText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigateScreen(APP_SCREEN.REGISTER)}>
            <Text style={styles.registerTextLink}> Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
};
