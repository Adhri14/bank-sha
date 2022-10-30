import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Button, Gap, Scaffold, Text } from '../../components';
import { Container } from '../../styled';
import StaticColor from '../../utils/Colors';
import { useCallback } from 'react';
import { userService } from '../../reducer/actions/user';
import { getDataFromLocalStorge } from '../../storage';
import { useDispatch } from 'react-redux';
import { SET_USER } from '../../reducer/key';

const TopUpSuccess = ({ navigation, route }) => {
    const { nameScreen } = route.params;
    const dispatch = useDispatch();
    const onSubmit = useCallback(async () => {
        try {
            const { token } = await getDataFromLocalStorge('userProfile');
            const res = await userService(token);
            dispatch({ type: SET_USER, value: { user: res } });
            navigation.reset({
                index: 0,
                routes: [{ name: 'MainApp' }],
            });
        } catch (error) {
            console.log(error);
        }
    }, []);
    return (
        <Scaffold
            useSafeArea
            showHeader={false}
            isLeftButton={false}
            scrollEnabled={false}
        >
            <Container
                flex={1}
                justify="center"
                align="center"
                marginHorizontal={60}
            >
                <Text type="semibold" size={20}>
                    {nameScreen === 'top_up'
                        ? 'Top Up\nWallet Berhasil'
                        : nameScreen === 'paket_data'
                        ? 'Paket Data\nBerhasil Terbeli'
                        : 'Berhasil Transfer'}
                </Text>
                <Gap height={26} />
                <Text
                    size={16}
                    type="regular"
                    color={StaticColor.subtitleColor}
                >
                    {'Use the money wisely and\ngrow your finance'}
                </Text>
                <Gap height={50} />
                <Button onPress={onSubmit}>Back to Home</Button>
            </Container>
        </Scaffold>
    );
};

export default TopUpSuccess;

const styles = StyleSheet.create({});
