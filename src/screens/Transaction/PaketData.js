import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import {
    IlWallet,
    LogoBankBCA,
    LogoBankBNI,
    LogoBankMandiri,
    LogoBankOCBC,
} from '../../assets';
import { Button, Gap, Scaffold, Text, TextInput } from '../../components';
import { Column, Container, Row } from '../../styled';
import StaticColor from '../../utils/Colors';

const TAB_BANK = [
    {
        id: 1,
        name: '10 GB',
        price: '200000',
    },
    {
        id: 2,
        name: '25 GB',
        price: '10000',
    },
    {
        id: 3,
        name: '40 GB',
        price: '200102',
    },
    {
        id: 4,
        name: '99 GB',
        price: '822912',
    },
];

const PaketData = ({ navigation }) => {
    const [currentIndex, setCurrentIndex] = useState(null);
    return (
        <Scaffold
            showHeader
            headerTitle="Paket Data"
            useSafeArea
            statusBarColor={StaticColor.backgroundColor}
            scrollEnabled
            contentContainerStyle={{ paddingBottom: 30 }}
        >
            <Container flex={1} marginHorizontal={24}>
                <Gap height={30} />
                <Text align="left" size={16} type="semibold">
                    Phone Number
                </Text>
                <Gap height={10} />
                <TextInput
                    styleInput={{ backgroundColor: 'white' }}
                    placeholder="+628"
                    keyboardType="number-pad"
                />
                <Gap height={40} />
                <Text align="left" size={16} type="semibold">
                    Select Bank
                </Text>
                <Gap height={10} />
                <Row justify="space-between" style={{ flexWrap: 'wrap' }}>
                    {TAB_BANK.map((item, index) => (
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
                            <Text size={32} type="medium">
                                {item.name}
                            </Text>
                            <Gap height={5} />
                            <Text
                                size={12}
                                type="regular"
                                color={StaticColor.subtitleColor}
                            >
                                Rp. {item.price}
                            </Text>
                        </Pressable>
                    ))}
                </Row>
                <Gap flex={1} />
                {currentIndex !== null && (
                    <Button
                        onPress={() =>
                            navigation.navigate('PIN', {
                                nameScreen: 'paket-data',
                            })
                        }
                    >
                        Continue
                    </Button>
                )}
            </Container>
        </Scaffold>
    );
};

export default PaketData;

const styles = StyleSheet.create({
    wallet: {
        width: 80,
        height: 55,
        marginRight: 16,
    },
    select: {
        padding: 22,
        backgroundColor: 'white',
        width: 158,
        marginBottom: 18,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'white',
        height: 171,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
