import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Button, Gap, Scaffold, Text } from '../../components';
import { Container } from '../../styled';
import StaticColor from '../../utils/Colors';

const TopUpSuccess = ({ navigation }) => {
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
                    {'Top Up\nWallet Berhasil'}
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
                <Button onPress={() => navigation.replace('MainApp')}>
                    Back to Home
                </Button>
            </Container>
        </Scaffold>
    );
};

export default TopUpSuccess;

const styles = StyleSheet.create({});
