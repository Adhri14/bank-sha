import { Image, StyleSheet, View, Pressable } from 'react-native'
import React from 'react'
import Text from './Text'
import { IcTopUp } from '../assets'
import PropTypes from 'prop-types'

const propTypes = {
    title: PropTypes.string,
    icon: PropTypes.string,
    onPress: PropTypes.func,
}

const defaultProps = {
    title: '',
    icon: '',
    onPress: () => { },
}

const ShorcutItem = (props) => {
    const { title, icon, onPress } = props;
    return (
        <Pressable style={styles.container} onPress={onPress}>
            <View style={styles.cardIcon}>
                <Image source={icon} style={styles.icon} />
            </View>
            <Text>{title}</Text>
        </Pressable>
    )
}

ShorcutItem.propTypes = propTypes;
ShorcutItem.defaultProps = defaultProps;

export default ShorcutItem

const styles = StyleSheet.create({
    container: {
        width: 70,
        alignItems: 'center',
    },
    cardIcon: {
        width: 70,
        height: 70,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        marginBottom: 8,
    },
    icon: {
        width: 26,
        height: 26,
    }
})