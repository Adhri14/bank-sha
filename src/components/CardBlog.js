import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import Text from './Text'

const CardBlog = ({ title, image }) => {
    return (
        <View style={styles.container}>
            <Image source={image} style={styles.image} />
            <Text align="left" style={{ paddingHorizontal: 12, paddingTop: 10 }} numberOfLines={2}>{title}</Text>
        </View>
    )
}

export default CardBlog

const styles = StyleSheet.create({
    container: {
        width: 155,
        height: 176,
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginBottom: 18
    },
    image: {
        width: '100%',
        height: 110,
        resizeMode: 'cover',
    }
})