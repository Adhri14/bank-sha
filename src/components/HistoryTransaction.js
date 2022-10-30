import React from 'react';
import { View, StyleSheet, Image, Pressable } from 'react-native';
import { IcTCat1 } from '../assets';
import { Row } from '../styled';
import StaticColor from '../utils/Colors';
import Gap from './Gap';
import Text from './Text';

const HistoryTransaction = ({ type, icon, time, value, onPress }) => {
    return (
        <Pressable onPress={onPress}>
            <View style={styles.container}>
                <Row justify="space-between">
                    <Row style={{ flex: 1, marginRight: 10 }}>
                        <Image source={icon} style={styles.icon} />
                        <View style={{ flex: 1 }}>
                            <Text size={16} align="left">
                                {type}
                            </Text>
                            <Gap height={3} />
                            <Text
                                color={StaticColor.subtitleColor}
                                size={12}
                                type="regular"
                                align="left"
                            >
                                {time}
                            </Text>
                        </View>
                    </Row>
                    <Text size={16} align="right">
                        {value}
                    </Text>
                </Row>
            </View>
        </Pressable>
    );
};

export default HistoryTransaction;

const styles = StyleSheet.create({
    container: {
        height: 48,
        flex: 1,
        marginTop: 18,
    },
    icon: {
        width: 48,
        height: 48,
        marginRight: 16,
    },
});
