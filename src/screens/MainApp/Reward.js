import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Scaffold } from '../../components'
import StaticColor from '../../utils/Colors'

const Reward = () => {
    return (
        <Scaffold useSafeArea statusBarColor={StaticColor.backgroundColor}>
            <View>
                <Text>Reward</Text>
            </View>
        </Scaffold>
    )
}

export default Reward

const styles = StyleSheet.create({})