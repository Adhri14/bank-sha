import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import {
    IlWallet,
    LogoBankBCA,
    LogoBankBNI,
    LogoBankMandiri,
    LogoBankOCBC,
    LogoIndosat,
    LogoSingTel,
    LogoTelkomsel,
} from '../../assets';
import { Button, Gap, Scaffold, Text } from '../../components';
import { Column, Container, Row } from '../../styled';
import StaticColor from '../../utils/Colors';

const TAB_PROVIDER = [
    {
        id: 1,
        name: 'Telkomsel',
        width: 95.75,
        height: 30,
        img: LogoTelkomsel,
    },
    {
        id: 2,
        name: 'Indosat Ooredoo',
        width: 56,
        height: 30,
        img: LogoIndosat,
    },
    {
        id: 3,
        name: 'Singtel ID',
        width: 55,
        height: 30,
        img: LogoSingTel,
    },
];

const BuyPulsa = ({ navigation }) => {
    const [currentIndex, setCurrentIndex] = useState(null);
    return (
        <Scaffold
            showHeader
            headerTitle="Beli Data"
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
                            0000 0000 0000 0000
                        </Text>
                        <Gap height={5} />
                        <Text
                            align="left"
                            size={12}
                            type="regular"
                            color={StaticColor.subtitleColor}
                        >
                            Balance: Rp. 1.000.000
                        </Text>
                    </View>
                </Row>
                <Gap height={40} />
                <Text align="left" size={16} type="semibold">
                    Select Bank
                </Text>
                <Gap height={10} />
                {TAB_PROVIDER.map((item, index) => (
                    <Pressable
                        key={item.id.toString()}
                        style={[
                            styles.select,
                            {
                                borderColor:
                                    currentIndex === index
                                        ? StaticColor.secondaryColor
                                        : 'white',
                            },
                        ]}
                        onPress={() => setCurrentIndex(index)}
                    >
                        <Row justify="space-between">
                            <Image
                                source={item.img}
                                style={{
                                    width: item.width,
                                    height: item.height,
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
                                    Available
                                </Text>
                            </View>
                        </Row>
                    </Pressable>
                ))}
                <Gap flex={1} />
                {currentIndex !== null && (
                    <Button onPress={() => navigation.navigate('PaketData')}>
                        Continue
                    </Button>
                )}
            </Container>
        </Scaffold>
    );
};

export default BuyPulsa;

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
