import React, {useEffect} from 'react';

import BootSplash from 'react-native-bootsplash';
import {useSelector} from 'react-redux';

import {selectAppToken} from '@redux/login/selector';
import {AuthStackNavigator} from './stack-navigator';
import {DrawerNavigator} from './drawer-navigator';

export const RootNavigation = () => {
  // state
  const token = useSelector(selectAppToken);

  // effect
  useEffect(() => {
    const id = setTimeout(() => {
      BootSplash.hide({fade: true});
    }, 1000);

    return () => clearTimeout(id);
  }, []);

  // render
  return <>{token === null ? <AuthStackNavigator /> : <DrawerNavigator />}</>;
};
