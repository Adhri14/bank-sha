import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Scaffold } from '../../components'
import StaticColor from '../../utils/Colors'

const Overview = () => {
    return (
        <Scaffold useSafeArea statusBarColor={StaticColor.backgroundColor}>
            <View>
                <Text>Overview</Text>
            </View>
        </Scaffold>
    )
}

export default Overview

const styles = StyleSheet.create({})