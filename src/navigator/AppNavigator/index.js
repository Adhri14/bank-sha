import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {IntroductionApp} from '../../screens';

const {Navigator, Screen} = createStackNavigator();

export default function AppNavigator() {
  return (
    <Navigator screenOptions={{header: () => null}}>
      <Screen name="IntroductionApp" component={IntroductionApp} />
    </Navigator>
  );
}
