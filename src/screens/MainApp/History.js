import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Scaffold, Text } from '../../components'
import StaticColor from '../../utils/Colors'
import { Container } from '../../styled'

const History = () => {
    return (
        <Scaffold useSafeArea statusBarColor={StaticColor.backgroundColor}>
            <Container flex={1} justify="center" align="center">
                <Text size={20} type="semibold">History</Text>
            </Container>
        </Scaffold>
    )
}

export default History

const styles = StyleSheet.create({})