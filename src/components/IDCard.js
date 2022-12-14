import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import StaticColor from '../utils/Colors';
import FormatMoney from '../utils/FormatMoney';
import Gap from './Gap';
import Text from './Text';

const { width } = Dimensions.get('window');
export default function IDCard({ cardNumber, balance, username }) {
    // const cardNumber =
    // const title = 'asdasd'
    // title.substring()
    return (
        <View style={styles.container}>
            <View style={styles.circle} />
            <Text size={18} type="medium" color="white">
                {username}
            </Text>
            <Gap height={25} />
            <View style={styles.row}>
                <Text
                    size={18}
                    type="medium"
                    color="white"
                    style={{ marginTop: 8, letterSpacing: 3, fontSize: 18 }}
                >
                    ****{' '}
                </Text>
                <Text
                    size={18}
                    type="medium"
                    color="white"
                    style={{ marginTop: 8, letterSpacing: 3, fontSize: 18 }}
                >
                    ****{' '}
                </Text>
                <Text
                    size={18}
                    type="medium"
                    color="white"
                    style={{ marginTop: 8, letterSpacing: 3, fontSize: 18 }}
                >
                    ****{' '}
                </Text>
                <Text size={18} type="medium" color="white" letterSpacing={2}>
                    {cardNumber}
                </Text>
            </View>
            <Gap height={20} />
            <Text type="regular" color="white">
                Balance
            </Text>
            <Gap height={5} />
            <Text size={24} type="semibold" color="white">
                {FormatMoney.getFormattedMoney(balance)}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: width - 24 / 0.5,
        height: 220,
        borderRadius: 28,
        backgroundColor: StaticColor.primaryColor,
        alignItems: 'flex-start',
        padding: 30,
        overflow: 'hidden',
        marginTop: 20,
    },
    circle: {
        width: 294,
        height: 294,
        borderWidth: 60,
        borderColor: StaticColor.secondaryColor,
        borderRadius: 294 / 2,
        position: 'absolute',
        top: -60,
        right: -160,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: -8,
    },
});
