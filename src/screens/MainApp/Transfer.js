import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Scaffold } from '../../components'
import StaticColor from '../../utils/Colors'

const Transfer = () => {
    return (
        <Scaffold useSafeArea statusBarColor={StaticColor.backgroundColor}>
            <View>
                <Text>Transfer</Text>
            </View>
        </Scaffold>
    )
}

export default Transfer

const styles = StyleSheet.create({})