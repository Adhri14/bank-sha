import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { IntroductionApp, PIN, SignIn, SignUp, SignUpIDCard, SignUpProfile } from '../../screens';

const { Navigator, Screen } = createStackNavigator();

export default function AppNavigator() {
  return (
    <Navigator screenOptions={{ header: () => null }}>

      {/* Intro App */}
      <Screen name="IntroductionApp" component={IntroductionApp} />

      {/* Authentication User */}
      <Screen name="SignUp" component={SignUp} />
      <Screen name="SignUpProfile" component={SignUpProfile} />
      <Screen name="SignUpIDCard" component={SignUpIDCard} />
      <Screen name="SignIn" component={SignIn} />
      <Screen name="PIN" component={PIN} />
    </Navigator>
  );
}
