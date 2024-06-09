import {wait} from '@common/method';
import {RegisterValidation} from '@common/zod-validate/login';
import {zodResolver} from '@hookform/resolvers/zod';
import {FormRegisterType} from '@model/authentication';
import {navigateScreen} from '@navigation/navigation-service';
import {APP_SCREEN} from '@navigation/screen-types';
import {Text, View} from '@rn-core';
import {styleSheet} from '@screens/un-authentication/login/styles';
import React, {useState} from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {
  ActivityIndicator,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useStyles} from 'react-native-unistyles';

export const FormRegister = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {styles} = useStyles(styleSheet);

  const {
    handleSubmit,
    formState: {errors},
    control,
  } = useForm<FormRegisterType>({
    resolver: zodResolver(RegisterValidation),
  });

  const onSubmitKey: SubmitHandler<FormRegisterType> = async _data => {
    setIsLoading(true);
    await wait(2000);
    setIsLoading(false);

    navigateScreen(APP_SCREEN.LOGIN);
  };

  return (
    <View style={{marginTop: 130, width: 260}}>
      <View style={{alignItems: 'center'}}>
        <Image
          style={styles.logo}
          source={require('@assets/images/larydefault.png')}
        />
      </View>
      <View style={{marginTop: 40}}>
        <Controller
          control={control}
          name="name"
          render={({field: {onChange, value}}) => (
            <TextInput
              style={[styles.inputBox, styles.mt4]}
              onChangeText={onChange}
              value={value}
              placeholder="Name"
              placeholderTextColor="gray"
            />
          )}
        />

        {errors?.name && (
          <Text style={{color: 'red'}}>{errors.name?.message}</Text>
        )}

        <Controller
          control={control}
          name="email"
          render={({field: {onChange, value}}) => (
            <TextInput
              style={[styles.inputBox, styles.mt4]}
              onChangeText={onChange}
              value={value}
              placeholder="Email"
              placeholderTextColor="gray"
              textContentType="emailAddress"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          )}
        />

        {errors?.email && (
          <Text style={{color: 'red'}}>{errors.email?.message}</Text>
        )}

        <Controller
          control={control}
          name="password"
          render={({field: {onChange, value}}) => (
            <TextInput
              style={[styles.inputBox, styles.mt4]}
              onChangeText={onChange}
              value={value}
              placeholder="Password"
              placeholderTextColor="gray"
              autoCapitalize="none"
              secureTextEntry={true}
            />
          )}
        />

        {errors?.password && (
          <Text style={{color: 'red'}}>{errors.password?.message}</Text>
        )}

        <Controller
          control={control}
          name="confirmPassword"
          render={({field: {onChange, value}}) => (
            <TextInput
              style={[styles.inputBox, styles.mt4]}
              onChangeText={onChange}
              value={value}
              placeholder="Confirm Password"
              placeholderTextColor="gray"
              autoCapitalize="none"
              secureTextEntry={true}
            />
          )}
        />

        {errors?.confirmPassword && (
          <Text style={{color: 'red'}}>{errors.confirmPassword?.message}</Text>
        )}
      </View>

      <TouchableOpacity
        onPress={handleSubmit(onSubmitKey)}
        style={[styles.loginButton, styles.mt5]}>
        {isLoading && (
          <ActivityIndicator
            size="small"
            color="white"
            style={{marginRight: 18}}
          />
        )}
        <Text style={styles.loginButtonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};
