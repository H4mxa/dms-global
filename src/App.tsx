import React, {ReactNode, Suspense, useState} from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {KeyboardProvider as RNKeyboardProvider} from 'react-native-keyboard-controller';
import {useDidMount} from './app/modules/common/hooks/index';
import {AppContainer} from '@navigation/app-navigation';
import {PortalProvider} from '@gorhom/portal';
import {Provider} from 'react-redux';
import {store} from './store/configureStore';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

const KeyboardProvider = ({children}: {children?: ReactNode}) => {
  // state
  const [loading, setLoading] = useState<boolean>(true);

  // effect
  useDidMount(() => {
    queueMicrotask(() => {
      setLoading(false);
    });
  });

  // render
  return (
    <>
      {loading ? null : (
        <RNKeyboardProvider statusBarTranslucent navigationBarTranslucent>
          {children}
        </RNKeyboardProvider>
      )}
    </>
  );
};

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar translucent backgroundColor={'transparent'} />
      <KeyboardProvider>
        <Provider store={store}>
          <Suspense fallback={null}>
            <PortalProvider>
              <GestureHandlerRootView style={styles.root}>
                <AppContainer />
              </GestureHandlerRootView>
            </PortalProvider>
          </Suspense>
        </Provider>
      </KeyboardProvider>
    </SafeAreaProvider>
  );
}

export default App;
