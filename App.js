/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import AppNavigator from './src/navigator/AppNavigator';
import StaticColor from './src/utils/Colors';

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{backgroundColor: StaticColor.backgroundColor}} />
      <AppNavigator />
    </NavigationContainer>
  );
};

// const styles = StyleSheet.create({});

export default App;
