import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { DmPerson1, IcCheck } from '../assets';
import StaticColor from '../utils/Colors';
import Gap from './Gap';
import Text from './Text';

export default function HeaderHome() {
    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Text size={16} type="regular" color={StaticColor.subtitleColor2}>Howdy,</Text>
                <Gap height={5} />
                <Text size={20} type="semibold">Adhri</Text>
            </View>
            <View style={styles.wrapperProfile}>
                <Image source={DmPerson1} style={styles.profile} />
                <Image source={IcCheck} style={styles.verified} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    profile: {
        width: 60,
        height: 60,
        resizeMode: 'cover',
    },
    wrapperProfile: {
        width: 60,
        height: 60,
        borderRadius: 60 / 2,
        backgroundColor: StaticColor.backgroundColor2,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingVertical: 10,
    },
    wrapper: {
        flex: 1,
        alignItems: 'flex-start',
    },
    verified: {
        width: 14,
        height: 14,
        position: 'absolute',
        right: 0
    }
})