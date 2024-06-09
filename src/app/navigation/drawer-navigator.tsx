import {createDrawerNavigator} from '@react-navigation/drawer';
import {HomeStackNavigator} from './stack-navigator';
import {SettingsScreen} from '@screens/authentication/settings';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome or any icon library you prefer
import {sizeScale} from '@common/scale';
import {removeAll} from '@helper/storage-handlers';
import {dispatch} from '@common/redux';
import {loginActions} from '@redux/login';
import {wait} from '@common/method';
import AppLoader from '@components/app-loader';
import {View} from '@rn-core';
import Entypo from 'react-native-vector-icons/Ionicons';
import {UnistylesRuntime, useStyles} from 'react-native-unistyles';
import {useCallback} from 'react';

export const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator();

  const {theme} = useStyles();

  const handleChangeTheme = useCallback(async () => {
    UnistylesRuntime.setTheme(
      UnistylesRuntime.themeName !== 'dark' ? 'dark' : 'light',
    );
  }, []);

  const renderLogoutButton = () => (
    <View
      style={{
        flexDirection: 'row',
        gap: sizeScale(20),
      }}>
      <TouchableOpacity
        style={{marginRight: sizeScale(6)}}
        onPress={handleChangeTheme}>
        {theme.type !== 'dark' ? (
          <Entypo name="moon-outline" size={24} color={theme.color.text} />
        ) : (
          <Entypo name="sunny" size={24} color={theme.color.text} />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={{marginRight: sizeScale(6)}}
        onPress={async () => {
          AppLoader.setVisible(true);
          await wait(1000);

          removeAll();
          dispatch(loginActions.removeToken());
          AppLoader.setVisible(false);
        }}>
        <FontAwesome name="sign-out" size={24} color={theme.color.text} />
      </TouchableOpacity>
    </View>
  );

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: theme.color.white,
        },
      }}>
      <Drawer.Screen
        name="Home"
        component={HomeStackNavigator}
        options={() => ({
          headerTitleStyle: {
            color: theme.color.text,
          },
          headerRight: () => renderLogoutButton(),
        })}
      />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
};
