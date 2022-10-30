import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {
    IcCirclePlus,
    IcHistory,
    IcOverview,
    IcReward,
    IcStatistic,
} from '../assets';
import { fontFamily } from './Text';
import StaticColor from '../utils/Colors';

const TabItem = ({ onPress, onLongPress, label, isFocused }) => {
    const Icon = () => {
        switch (label) {
            case 'Overview':
                return (
                    <Image
                        source={IcOverview}
                        style={[
                            styles.icon,
                            {
                                tintColor: isFocused
                                    ? StaticColor.secondaryColor
                                    : StaticColor.titleColor,
                            },
                        ]}
                    />
                );
            case 'History':
                return (
                    <Image
                        source={IcHistory}
                        style={[
                            styles.icon,
                            {
                                tintColor: isFocused
                                    ? StaticColor.secondaryColor
                                    : StaticColor.titleColor,
                            },
                        ]}
                    />
                );
            case 'Transfers':
                return <IconPlus />;
            case 'Statistic':
                return (
                    <Image
                        source={IcStatistic}
                        style={[
                            styles.icon,
                            {
                                tintColor: isFocused
                                    ? StaticColor.secondaryColor
                                    : StaticColor.titleColor,
                            },
                        ]}
                    />
                );
            case 'Reward':
                return (
                    <Image
                        source={IcReward}
                        style={[
                            styles.icon,
                            {
                                tintColor: isFocused
                                    ? StaticColor.secondaryColor
                                    : StaticColor.titleColor,
                            },
                        ]}
                    />
                );
            default:
                return <View />;
        }
    };

    const IconPlus = () => {
        return (
            <View style={styles.containerIcon}>
                <Image source={IcCirclePlus} style={styles.iconPlus} />
            </View>
        );
    };

    return (
        <Pressable
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tab}
        >
            <Icon />
            {label !== 'Transfers' && (
                <Text
                    style={[
                        styles.label,
                        {
                            color: isFocused
                                ? StaticColor.secondaryColor
                                : StaticColor.titleColor,
                        },
                    ]}
                >
                    {label}
                </Text>
            )}
        </Pressable>
    );
};

export default TabItem;

const styles = StyleSheet.create({
    tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 20,
        height: 20,
        marginBottom: 5,
    },
    label: {
        fontFamily: fontFamily.medium,
        fontSize: 10,
    },
    iconPlus: {
        width: 24,
        height: 24,
    },
    containerIcon: {
        backgroundColor: StaticColor.primaryColor,
        padding: 12,
        borderRadius: 30,
        top: -34,
        borderWidth: 5,
        borderColor: 'white',
    },
});
