/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { useEffect } from 'react';
import { View, StatusBar, SafeAreaView } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { Provider, useDispatch } from 'react-redux';
import AppNavigator from './src/navigator/AppNavigator';
import { SETTING_APP, SET_SETTING_APP } from './src/reducer/key';
import store from './src/reducer/store';
import {
    getDataFromLocalStorge,
    removeDataFromLocalStorage,
    saveToLocalStorage,
} from './src/storage';
import StaticColor from './src/utils/Colors';
import { isIphoneNotch } from './src/utils/Constants';
import RNBootSplash from 'react-native-bootsplash';

const MainApp = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        getDataFromLocalStorge(SETTING_APP).then(res => {
            // removeDataFromLocalStorage(['userProfile']);
            if (res === true || res === null) {
                dispatch({ type: SET_SETTING_APP, value: true });
            } else {
                dispatch({ type: SET_SETTING_APP, value: false });
            }
        });
    }, []);
    return (
        <View style={{ flex: 1, backgroundColor: StaticColor.backgroundColor }}>
            <NavigationContainer onReady={() => RNBootSplash.hide()}>
                <StatusBar barStyle="dark-content" />
                {/* <SafeAreaView style={{backgroundColor: StaticColor.backgroundColor}} /> */}
                <AppNavigator />
                <FlashMessage
                    position="top"
                    style={{ paddingTop: isIphoneNotch() ? 50 : 0 }}
                />
            </NavigationContainer>
        </View>
    );
};

const App = () => {
    return (
        <Provider store={store}>
            <MainApp />
        </Provider>
    );
};

// const styles = StyleSheet.create({});

export default App;
