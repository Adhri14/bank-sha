import { Pressable, StyleSheet, View } from 'react-native'
import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { Row } from '../styled'
import Text from './Text'

const Header = ({ title, onPressLeftButton, iconRightButton, isLeftButton = true }) => {
    return (
        <Row justify="space-between" style={styles.container}>
            {isLeftButton ? <Pressable onPress={onPressLeftButton} style={styles.icon}>
                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M15 18L9 12L15 6" stroke="#14193F" strokeWidth={2} stroke-linecap="round" stroke-linejoin="round" />
                </Svg>

            </Pressable> : <View style={styles.view} />}
            <Text size={20} type="semibold">{title}</Text>
            <View style={styles.icon}>
                {iconRightButton ? iconRightButton : <View style={styles.view} />}
            </View>
        </Row>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
    },
    icon: {
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
    }
})