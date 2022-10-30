import React, { useEffect, useState } from 'react';
import {
    Alert,
    StyleSheet,
    TouchableOpacity,
    Vibration,
    View,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Button, Gap, Scaffold, Text, ToastMessage } from '../../components';
import { Row } from '../../styled';
import StaticColor from '../../utils/Colors';

const TopUpAmount = ({ navigation, route }) => {
    const { code, nameScreen } = route.params;
    const [amount, setAmount] = useState('');

    const numpad = [
        { id: '1' },
        { id: '2' },
        { id: '3' },
        { id: '4' },
        { id: '5' },
        { id: '6' },
        { id: '7' },
        { id: '8' },
        { id: '9' },
    ];

    const addAmount = val => {
        let newAmount = amount + val;
        setAmount(newAmount);
    };

    const removeAmount = () => {
        let newAmount = amount.substring(0, amount.length - 1);
        setAmount(newAmount);
    };

    let amountToStr = amount.split('');

    const onSubmit = () => {
        const data = {
            nameScreen,
            amount: Number(amount),
            code,
        };
        navigation.navigate('PINTransaction', { data: data });
    };

    return (
        <Scaffold
            useSafeArea={false}
            showHeader={false}
            statusBarColor={StaticColor.backgroundColor4}
            barStyle="light-content"
            style={styles.page}
        >
            <View style={styles.container}>
                <Text color="white" size={20} type="semibold">
                    Total Amount
                </Text>
                <View style={styles.input}>
                    <Text size={36} color="white" type="light">
                        Rp.{' '}
                    </Text>
                    <Row>
                        {amountToStr.map((item, index) => (
                            <Text
                                key={index.toString()}
                                size={36}
                                color="white"
                                type="medium"
                            >
                                {item === '' ? '0' : item}
                            </Text>
                        ))}
                    </Row>
                </View>
                <View style={styles.numpad}>
                    {numpad.map(item => (
                        <Button
                            onPress={() => {
                                addAmount(item.id);
                            }}
                            key={item.id}
                            size={22}
                            style={styles.button}
                        >
                            {item.id}
                        </Button>
                    ))}
                    <Button
                        size={22}
                        style={styles.button}
                        onPress={() => {
                            addAmount('0');
                        }}
                    >
                        0
                    </Button>
                    <Button
                        size={22}
                        style={styles.button}
                        onPress={() => {
                            addAmount('000');
                        }}
                    >
                        000
                    </Button>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            removeAmount();
                        }}
                    >
                        <Svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <Path
                                d="M19 12H5"
                                stroke="white"
                                stroke-width="4"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <Path
                                d="M12 19L5 12L12 5"
                                stroke="white"
                                stroke-width="4"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </Svg>
                    </TouchableOpacity>
                </View>
                <Gap height={40} />
                <Button onPress={onSubmit}>Checkout Now</Button>
                <Gap height={20} />
                <Text
                    size={16}
                    type="regular"
                    color={StaticColor.subtitleColor2}
                >
                    Terms & Conditions
                </Text>
                <Gap height={10} />
            </View>
        </Scaffold>
    );
};

export default TopUpAmount;

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: 'red',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: StaticColor.backgroundColor4,
        paddingVertical: 36,
        paddingHorizontal: 58,
    },
    input: {
        width: 200,
        maxWidth: 300,
        borderBottomWidth: 1,
        borderBottomColor: '#262939',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 80,
        flexDirection: 'row',
        paddingVertical: 10,
    },
    numpad: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginTop: 40,
    },
    button: {
        width: 60,
        height: 60,
        backgroundColor: StaticColor.titleColor,
        borderRadius: 60 / 2,
        marginHorizontal: 16,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
