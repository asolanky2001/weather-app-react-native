/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import HomeScreen from './src/components/HomeScreen';
// import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/store';
import NativeAppearance from 'react-native/Libraries/Utilities/NativeAppearance';
import MainStackNavigator from './src/components/routes';

const App = () => {
  const colorScheme = NativeAppearance.getColorScheme();
  // const store = configureStore();
  // console.log('colorScheme', colorScheme);
  return (
    <Provider store={store}>
      <MainStackNavigator />
    </Provider>
  );
};

export default App;
