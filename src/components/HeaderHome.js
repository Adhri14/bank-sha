import React from 'react';
import { View, StyleSheet, Image, Pressable } from 'react-native';
import { DmPerson1, IcCheck } from '../assets';
import StaticColor from '../utils/Colors';
import Gap from './Gap';
import Text from './Text';

export default function HeaderHome({ name, img, isVerified, onPress }) {
    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Text
                    size={16}
                    type="regular"
                    color={StaticColor.subtitleColor2}
                >
                    Howdy,
                </Text>
                <Gap height={5} />
                <Text size={20} type="semibold">
                    {name}
                </Text>
            </View>
            <Pressable onPress={onPress}>
                <View style={styles.wrapperProfile}>
                    <Image source={img} style={styles.profile} />
                    {isVerified && (
                        <Image source={IcCheck} style={styles.verified} />
                    )}
                </View>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    profile: {
        width: 60,
        height: 60,
        resizeMode: 'cover',
        borderRadius: 60 / 2,
    },
    wrapperProfile: {
        width: 60,
        height: 60,
        borderRadius: 60 / 2,
        backgroundColor: StaticColor.backgroundColor2,
        // overflow: 'hidden',
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
        right: 0,
    },
});
