import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Scaffold } from '../../components'
import StaticColor from '../../utils/Colors'

const History = () => {
    return (
        <Scaffold useSafeArea statusBarColor={StaticColor.backgroundColor}>
            <View>
                <Text>History</Text>
            </View>
        </Scaffold>
    )
}

export default History

const styles = StyleSheet.create({})