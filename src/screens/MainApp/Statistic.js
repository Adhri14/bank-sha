import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Scaffold } from '../../components'
import StaticColor from '../../utils/Colors'

const Statistic = () => {
    return (
        <Scaffold useSafeArea statusBarColor={StaticColor.backgroundColor}>
            <View>
                <Text>Statistic</Text>
            </View>
        </Scaffold>
    )
}

export default Statistic

const styles = StyleSheet.create({})