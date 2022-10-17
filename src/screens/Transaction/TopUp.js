import React from 'react'
import { StyleSheet, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { Scaffold, Text } from '../../components'
import StaticColor from '../../utils/Colors'

const TopUp = () => {
    return (
        <Scaffold showHeader headerTitle="Top Up" useSafeArea statusBarColor={StaticColor.backgroundColor} scrollEnabled contentContainerStyle={{ paddingBottom: 30 }}>
            <Text>TopUp</Text>
        </Scaffold>
    )
}

export default TopUp

const styles = StyleSheet.create({})