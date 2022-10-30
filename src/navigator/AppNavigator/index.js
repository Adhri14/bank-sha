import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
    BuyPulsa,
    EditPinUser,
    EditProfileUser,
    IntroductionApp,
    PaketData,
    PIN,
    PINTransaction,
    ProfileUser,
    SignIn,
    SignUp,
    SignUpIDCard,
    SignUpProfile,
    SuccessUpdate,
    TopUp,
    TopUpAmount,
    TopUpSuccess,
    Transfer,
    DetailTransaction,
} from '../../screens';
import BottomNavigator from '../BottomNavigator';

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

            {/* Main Application */}
            <Screen name="MainApp" component={BottomNavigator} />

            {/* Transaction */}
            <Screen name="TopUp" component={TopUp} />
            <Screen name="TopUpAmount" component={TopUpAmount} />
            <Screen name="TopUpSuccess" component={TopUpSuccess} />
            <Screen name="BuyPulsa" component={BuyPulsa} />
            <Screen name="PaketData" component={PaketData} />
            <Screen name="Transfer" component={Transfer} />
            <Screen name="PINTransaction" component={PINTransaction} />
            <Screen name="DetailTransaction" component={DetailTransaction} />

            {/* User */}
            <Screen name="ProfileUser" component={ProfileUser} />
            <Screen name="EditProfileUser" component={EditProfileUser} />
            <Screen name="EditPinUser" component={EditPinUser} />
            <Screen name="SuccessUpdate" component={SuccessUpdate} />
        </Navigator>
    );
}
