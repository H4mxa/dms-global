import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';

import {useSelector} from 'react-redux';

import {PortalHost} from '@gorhom/portal';
import {RootNavigation} from '@navigation/root-navigator';
import {
  DefaultTheme,
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {useStyles} from '@theme';

import {NavigationService} from './navigation-service';
import {RXStore, dispatch} from '@common/redux';
import {selectAppConfig} from '@redux/app/selector';
import {appActions} from '@redux/app';
import {SnackBar} from '@components/snack-bar';

export const AppContainer = () => {
  // state
  const navigationRef = useNavigationContainerRef();

  const {theme} = useStyles();

  const {loadingApp} = useSelector(selectAppConfig);

  // effect
  useEffect(() => {
    dispatch(appActions.processStartLoadApp());
  }, []);

  // render
  return (
    <NavigationContainer
      ref={navigationRef}
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: theme.color.background,
        },
      }}>
      <>
        <StatusBar translucent backgroundColor={'transparent'} />
        {!loadingApp && (
          <>
            <RootNavigation />
            <PortalHost name={'AppModal'} />
            <SnackBar />
          </>
        )}
        <RXStore />
        <NavigationService />
      </>
    </NavigationContainer>
  );
};
