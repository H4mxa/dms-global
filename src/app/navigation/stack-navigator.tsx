import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {APP_SCREEN, RootStackParamList} from '@navigation/screen-types';
import {TabNavigator} from './tab-navigator';
import {HomeScreen} from '@screens/authentication/home';
import {Login} from '@screens/un-authentication/login';
import {Register} from '@screens/un-authentication/register';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const HomeStackNavigator = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        statusBarTranslucent: true,
        navigationBarColor: 'transparent',
      }}>
      <RootStack.Screen name={APP_SCREEN.TAB} component={TabNavigator} />
      <RootStack.Screen name={APP_SCREEN.HOME} component={HomeScreen} />
    </RootStack.Navigator>
  );
};

export const AuthStackNavigator = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        statusBarTranslucent: true,
        navigationBarColor: 'transparent',
      }}>
      <RootStack.Group
        screenOptions={{
          freezeOnBlur: true,
        }}>
        <RootStack.Screen name={APP_SCREEN.LOGIN} component={Login} />
        <RootStack.Screen name={APP_SCREEN.REGISTER} component={Register} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};
