import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { History, Overview, Reward, Statistic, Transfer } from '../../screens';
import { Scaffold, TabNavigator } from '../../components';

const { Navigator, Screen } = createBottomTabNavigator();

export default function BottomNavigator() {
    return (
        <Navigator screenOptions={{ header: () => null }} tabBar={props => <TabNavigator {...props} />}>
            <Screen name='Overview' component={Overview} />
            <Screen name='History' component={History} />
            <Screen name='Transfer' component={Transfer} />
            <Screen name='Statistic' component={Statistic} />
            <Screen name='Reward' component={Reward} />
        </Navigator>
    )
}