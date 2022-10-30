import React, { useState } from 'react';
import { useEffect } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useDispatch, useSelector } from 'react-redux';
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
import { providerAction } from '../../reducer/actions/provider';
import { providerReducer } from '../../reducer/reducers/provider';
import { Column, Container, Row } from '../../styled';
import StaticColor from '../../utils/Colors';
import FormatMoney from '../../utils/FormatMoney';

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
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const { providers } = useSelector(state => state.providers);
    // const [currentIndex, setCurrentIndex] = useState(null);
    const [dataProvider, setDataProvider] = useState({
        id: null,
        data: [],
    });

    useEffect(() => {
        dispatch(providerAction());
    }, []);

    const onSave = item => {
        setDataProvider({
            ...dataProvider,
            id: item.id,
            data: item.data_plans,
        });
    };

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
                            {user?.card_number.replace(/.{4}/g, '$& ')}
                        </Text>
                        <Gap height={5} />
                        <Text
                            align="left"
                            size={12}
                            type="regular"
                            color={StaticColor.subtitleColor}
                        >
                            Balance:{' '}
                            {FormatMoney.getFormattedMoney(user?.balance)}
                        </Text>
                    </View>
                </Row>
                <Gap height={40} />
                <Text align="left" size={16} type="semibold">
                    Select Bank
                </Text>
                <Gap height={10} />
                {providers.map(item => (
                    <Pressable
                        key={item.id.toString()}
                        style={[
                            styles.select,
                            {
                                borderColor:
                                    dataProvider.id === item.id
                                        ? StaticColor.secondaryColor
                                        : 'white',
                            },
                        ]}
                        onPress={() => onSave(item)}
                    >
                        <Row justify="space-between">
                            <Image
                                source={{ uri: item.thumbnail }}
                                style={{
                                    width: 85,
                                    // item.name === 'Telkomsel'
                                    //     ? 96
                                    //     : item.name === 'Indosat'
                                    //     ? 56
                                    //     : 55,
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
                                    Available
                                </Text>
                            </View>
                        </Row>
                    </Pressable>
                ))}
                <Gap flex={1} />
                {dataProvider.id !== null && (
                    <Button
                        onPress={() =>
                            navigation.navigate('PaketData', { dataProvider })
                        }
                    >
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
