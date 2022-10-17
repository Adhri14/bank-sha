import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import Text from './Text'
import { DmPerson1 } from '../assets'

const CardPeople = ({ name, image }) => {
    return (
        <View style={styles.container}>
            <Image source={image} style={styles.profile} />
            <Text size={12}>{name}</Text>
        </View>
    )
}

export default CardPeople

const styles = StyleSheet.create({
    container: {
        width: 90,
        height: 120,
        borderRadius: 20,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 7,
        paddingVertical: 22,
        marginRight: 17
    },
    profile: {
        width: 45,
        height: 45,
        borderRadius: 45 / 2,
        marginBottom: 13,
    }
})