import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Gap, HistoryTransaction, Scaffold, Text } from '../../components';
import StaticColor from '../../utils/Colors';
import { Container } from '../../styled';
import { IcTCat1, IcTCat2, IcTCat3, IcTCat4, IcTCat5 } from '../../assets';
import Icon from '../../components/Icon';

const History = () => {
    return (
        <Scaffold
            showHeader
            headerTitle="History"
            useSafeArea
            statusBarColor={StaticColor.backgroundColor}
            scrollEnabled
            contentContainerStyle={{ paddingBottom: 30 }}
            isLeftButton={false}
            iconRightButton={<Icon />}
        >
            <Container flex={1} marginHorizontal={24}>
                <Gap height={30} />
                <Text size={16} type="semibold" align="left">
                    Today
                </Text>
                <Gap height={14} />
                <View
                    style={[
                        styles.content,
                        {
                            backgroundColor: 'white',
                            borderRadius: 20,
                            padding: 22,
                            paddingTop: 4,
                        },
                    ]}
                >
                    <HistoryTransaction
                        icon={IcTCat1}
                        type="Top Up"
                        time="Yesterday"
                        value="+ 450.000"
                    />
                    <HistoryTransaction
                        icon={IcTCat2}
                        type="Cashback"
                        time="Sep 11"
                        value="+ 22.000"
                    />
                    <HistoryTransaction
                        icon={IcTCat3}
                        type="Withdraw"
                        time="Sep 2"
                        value="- 5.000"
                    />
                </View>
                <Gap height={40} />
                <Text size={16} type="semibold" align="left">
                    Tue 12 Dec
                </Text>
                <Gap height={14} />
                <View
                    style={[
                        styles.content,
                        {
                            backgroundColor: 'white',
                            borderRadius: 20,
                            padding: 22,
                            paddingTop: 4,
                        },
                    ]}
                >
                    <HistoryTransaction
                        icon={IcTCat4}
                        type="Transfer"
                        time="Aug 11"
                        value="- 123.500"
                    />
                    <HistoryTransaction
                        icon={IcTCat5}
                        type="Electric"
                        time="Feb 11"
                        value="- 12.300.000"
                    />
                </View>
            </Container>
        </Scaffold>
    );
};

export default History;

const styles = StyleSheet.create({});
