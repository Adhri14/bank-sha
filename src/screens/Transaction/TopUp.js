import React, { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useDispatch, useSelector } from 'react-redux';
import {
    IlWallet,
    LogoBankBCA,
    LogoBankBNI,
    LogoBankMandiri,
    LogoBankOCBC,
} from '../../assets';
import { Button, Gap, Scaffold, Text } from '../../components';
import { bankAction } from '../../reducer/actions/bank';
import { Column, Container, Row } from '../../styled';
import StaticColor from '../../utils/Colors';

const TAB_BANK = [
    {
        id: 1,
        name: 'BANK BCA',
        time: '50 mins',
        width: 96,
        height: 30,
        img: LogoBankBCA,
    },
    {
        id: 2,
        name: 'Bank BNI',
        time: '50 mins',
        width: 91,
        height: 30,
        img: LogoBankBNI,
    },
    {
        id: 3,
        name: 'Bank Mandiri',
        time: '50 mins',
        width: 106,
        height: 31,
        img: LogoBankMandiri,
    },
    {
        id: 4,
        name: 'Bank OCBC',
        time: '50 mins',
        width: 142.5,
        height: 30,
        img: LogoBankOCBC,
    },
];

const TopUp = ({ navigation }) => {
    const { user, bank } = useSelector(state => state);
    const dispatch = useDispatch();
    const [currentIndex, setCurrentIndex] = useState(null);
    useEffect(() => {
        dispatch(bankAction());
    }, []);
    return (
        <Scaffold
            showHeader
            headerTitle="Top Up"
            useSafeArea
            statusBarColor={StaticColor.backgroundColor}
            scrollEnabled
            contentContainerStyle={{ paddingBottom: 30 }}
        >
            <Container flex={1} marginHorizontal={24}>
                <Gap height={30} />
                <Text align="left" size={16} type="semibold">
                    Wallet
                </Text>
                <Gap height={10} />
                <Row justify="space-between">
                    <Image source={IlWallet} style={styles.wallet} />
                    <View style={{ flex: 1 }}>
                        <Text align="left" size={16} type="medium">
                            {user.user?.card_number.replace(/.{4}/g, '$& ')}
                        </Text>
                        <Gap height={5} />
                        <Text
                            align="left"
                            size={12}
                            type="regular"
                            color={StaticColor.subtitleColor}
                        >
                            {user.user?.username}
                        </Text>
                    </View>
                </Row>
                <Gap height={40} />
                <Text align="left" size={16} type="semibold">
                    Select Bank
                </Text>
                <Gap height={10} />
                <Column>
                    {bank.data.map((item, index) => (
                        <Pressable
                            key={item.code}
                            style={[
                                styles.select,
                                {
                                    borderColor:
                                        currentIndex === item.code
                                            ? StaticColor.secondaryColor
                                            : 'white',
                                },
                            ]}
                            onPress={() => setCurrentIndex(item.code)}
                        >
                            <Row justify="space-between">
                                <Image
                                    source={{ uri: item.thumbnail }}
                                    style={{
                                        width: 85,
                                        height: 30,
                                        resizeMode: 'contain',
                                    }}
                                />
                                <View>
                                    <Text align="right" size={16} type="medium">
                                        {item.name}
                                    </Text>
                                    <Gap height={5} />
                                    <Text
                                        align="right"
                                        size={12}
                                        type="regular"
                                        color={StaticColor.subtitleColor}
                                    >
                                        {item.time}
                                    </Text>
                                </View>
                            </Row>
                        </Pressable>
                    ))}
                    <Gap height={12} />
                    {currentIndex !== null && (
                        <Button
                            onPress={() =>
                                navigation.navigate('TopUpAmount', {
                                    code: currentIndex,
                                    nameScreen: 'top_up',
                                })
                            }
                        >
                            Continue
                        </Button>
                    )}
                </Column>
            </Container>
        </Scaffold>
    );
};

export default TopUp;

const styles = StyleSheet.create({
    wallet: {
        width: 80,
        height: 55,
        marginRight: 16,
    },
    select: {
        padding: 22,
        backgroundColor: 'white',
        width: '100%',
        marginBottom: 18,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'white',
        height: 87,
    },
});
