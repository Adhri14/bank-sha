import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    RefreshControl,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Gap, HistoryTransaction, Scaffold, Text } from '../../components';
import StaticColor from '../../utils/Colors';
import { Container } from '../../styled';
import { IcTCat1, IcTCat2, IcTCat3, IcTCat4, IcTCat5 } from '../../assets';
import Icon from '../../components/Icon';
import { useSelector } from 'react-redux';
import FormatMoney from '../../utils/FormatMoney';
import {
    getDataFromLocalStorge,
    removeDataFromLocalStorage,
} from '../../storage';
import axios from 'axios';
import { API_URL } from '../../services/config';
import { Component } from 'react';

const { height } = Dimensions.get('screen');

const History = ({ navigation }) => {
    const [page, setPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(0);
    const [data, setData] = useState([]);
    const [loadMore, setLoadMore] = useState(true);
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        if (loadMore) {
            getHistoryTransaction();
        }
    }, [loadMore]);

    useEffect(() => {
        if (refresh) {
            getHistoryTransaction();
        }
    }, [refresh]);

    function getHistoryTransaction() {
        console.log('fetch', page);
        console.log(`${API_URL}/transactions?page=${page}`);
        getDataFromLocalStorge('userProfile').then(token => {
            axios
                .get(`${API_URL}/transactions?page=${page}`, {
                    headers: { Authorization: `Bearer ${token.token}` },
                })
                .then(res => {
                    console.log('response : ', res.data.last_page);
                    if (res.data.data.length === 0) {
                        return setLoadMore(false);
                    }
                    if (page === 1) {
                        setData(res.data.data);
                    } else {
                        setData(prev => [...prev, ...res.data.data]);
                    }
                    setLoadMore(false);
                    setLoading(false);
                    setRefresh(false);
                    setCurrentPage(res.data.last_page);
                })
                .catch(err => {
                    console.log(err.response);
                    if (err.response.status === 401) {
                        removeDataFromLocalStorage(['userProfile']);
                        redirectTo('SignIn');
                    }
                    setLoadMore(false);
                    setLoading(false);
                    setRefresh(false);
                });
        });
    }

    function redirectTo(name) {
        navigation.reset({ index: 0, routes: [{ name }] });
    }

    return (
        <Scaffold
            showHeader
            headerTitle="History"
            useSafeArea
            statusBarColor={StaticColor.backgroundColor}
            // scrollEnabled
            contentContainerStyle={{
                flexGrow: 0,
            }}
            isLeftButton={false}
            iconRightButton={<Icon />}
        >
            <Container marginHorizontal={24} height={height}>
                {loading ? (
                    <View style={styles.loading}>
                        <ActivityIndicator
                            color={StaticColor.primaryColor}
                            size="large"
                        />
                    </View>
                ) : null}
                {!loading && data.length > 0 ? (
                    <FlatList
                        refreshControl={
                            <RefreshControl
                                refreshing={refresh}
                                onRefresh={() => {
                                    setPage(1);
                                    setRefresh(true);
                                }}
                                colors={[StaticColor.primaryColor]}
                                tintColor={StaticColor.primaryColor}
                            />
                        }
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 240 }}
                        data={data}
                        renderItem={({ item }) => (
                            <HistoryTransaction
                                onPress={() =>
                                    navigation.navigate('DetailTransaction', {
                                        item,
                                    })
                                }
                                icon={
                                    item.transaction_type.code === 'top_up' ||
                                    item.transaction_type.code === 'receive'
                                        ? IcTCat1
                                        : item.transaction_type.code ===
                                          'internet'
                                        ? IcTCat5
                                        : item.transaction_type.code ===
                                          'transfer'
                                        ? IcTCat4
                                        : IcTCat5
                                }
                                type={
                                    item.transaction_type.code === 'top_up'
                                        ? 'Top Up'
                                        : item.transaction_type.code ===
                                          'internet'
                                        ? 'Data Plan'
                                        : item.transaction_type.code ===
                                          'receive'
                                        ? 'Receive'
                                        : 'Transfer'
                                }
                                time={item.transaction_code}
                                value={FormatMoney.getFormattedMoney(
                                    item.amount,
                                    item.transaction_type.code !== 'top_up'
                                        ? '-'
                                        : '+',
                                )}
                            />
                        )}
                        onEndReached={() => {
                            if (page <= currentPage) {
                                setPage(page + 1);
                                setLoadMore(true);
                            } else {
                                null;
                            }
                        }}
                        onEndReachedThreshold={0.01}
                        ListFooterComponent={() => {
                            if (loadMore) {
                                return (
                                    <View style={{ alignSelf: 'center' }}>
                                        <ActivityIndicator
                                            color={StaticColor.primaryColor}
                                            size="large"
                                        />
                                    </View>
                                );
                            }
                            return <Text>Tidak ada data</Text>;
                        }}
                    />
                ) : (
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                colors={[StaticColor.primaryColor]}
                                tintColor={StaticColor.primaryColor}
                                refreshing={refresh}
                                onRefresh={() => {
                                    setPage(1);
                                    setRefresh(true);
                                }}
                            />
                        }
                        contentContainerStyle={styles.loading}
                    >
                        <Text size={16} type="semibold">
                            Tidak ada data
                        </Text>
                    </ScrollView>
                )}
            </Container>
        </Scaffold>
    );
};

export default History;

const styles = StyleSheet.create({
    loading: {
        height: height * 0.75,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
