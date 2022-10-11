/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { View, StatusBar, SafeAreaView } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import AppNavigator from './src/navigator/AppNavigator';
import StaticColor from './src/utils/Colors';
import { isIphoneNotch } from './src/utils/Constants';

const App = () => {
  return (
    <View style={{ flex: 1, backgroundColor: StaticColor.backgroundColor }}>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" />
        {/* <SafeAreaView style={{backgroundColor: StaticColor.backgroundColor}} /> */}
        <AppNavigator />
        <FlashMessage position="top" style={{ paddingTop: isIphoneNotch() ? 50 : 0 }} />
      </NavigationContainer>
    </View>
  );
};

// const styles = StyleSheet.create({});

export default App;
