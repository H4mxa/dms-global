import {createDrawerNavigator} from '@react-navigation/drawer';
import {HomeStackNavigator} from './stack-navigator';
import {SettingsScreen} from '@screens/authentication/settings';

export const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
      }}>
      <Drawer.Screen name="Home" component={HomeStackNavigator} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
};
