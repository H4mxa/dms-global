import {loginValidation} from '@common/zod-validate/login';
import {zodResolver} from '@hookform/resolvers/zod';
import {FormLoginType} from '@model/authentication';
import {Text, View} from '@rn-core';
import React from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {
  ActivityIndicator,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {FormLoginProps} from '../type';
import {useStyles} from '@themes/index';
import {styleSheet} from '../styles';

export const FormLogin: React.FC<FormLoginProps> = ({isLoading, onSubmit}) => {
  const {styles} = useStyles(styleSheet);

  const {
    handleSubmit,
    formState: {errors},
    control,
  } = useForm<FormLoginType>({
    resolver: zodResolver(loginValidation),
  });

  const onSubmitKey: SubmitHandler<FormLoginType> = data => {
    onSubmit(data);
  };

  return (
    <View style={{marginTop: 130, width: 260}}>
      <View style={{alignItems: 'center'}}>
        <Image
          style={styles.logo}
          source={require('@assets/images/larydefault.png')}></Image>
      </View>
      <View style={{marginTop: 40}}>
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
          <Text style={{color: 'red', marginTop: 4}}>
            {errors.email.message}
          </Text>
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
          <Text style={{color: 'red', marginTop: 4}}>
            {errors.password.message}
          </Text>
        )}
      </View>

      <TouchableOpacity
        onPress={handleSubmit(onSubmitKey)}
        style={[styles.loginButton, styles.mt5]}>
        {isLoading && (
          <ActivityIndicator
            style={{marginRight: 18}}
            size="small"
            color="white"
          />
        )}
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};
