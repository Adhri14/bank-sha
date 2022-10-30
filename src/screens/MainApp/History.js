import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Gap, HistoryTransaction, Scaffold, Text } from '../../components';
import StaticColor from '../../utils/Colors';
import { Container } from '../../styled';
import { IcTCat1, IcTCat2, IcTCat3, IcTCat4, IcTCat5 } from '../../assets';
import Icon from '../../components/Icon';
import { useSelector } from 'react-redux';
import FormatMoney from '../../utils/FormatMoney';
import { getDataFromLocalStorge } from '../../storage';
import axios from 'axios';
import { API_URL } from '../../services/config';
import { Component } from 'react';

const { height } = Dimensions.get('screen');
class History extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            currentPage: 0,
            page: 1,
        };
    }

    componentDidMount() {
        this.getHistoryTransaction();
    }

    getHistoryTransaction = () => {
        getDataFromLocalStorge('userProfile').then(token => {
            axios
                .get(`${API_URL}/transactions?page=${this.state.page}`, {
                    headers: { Authorization: `Bearer ${token.token}` },
                })
                .then(res => {
                    console.log(res.data.data);
                    console.log(res.data.current_page);
                    // setCurrentPage(res.data.last_page);
                    this.setState({
                        data:
                            this.state.page === 1
                                ? res.data.data
                                : [...this.state.data, ...res.data.data],
                        currentPage: res.data.last_page,
                    });
                })
                .catch(err => {
                    console.log(err.response);
                });
        });
    };

    loadMore = () => {
        this.setState(
            {
                page: this.state.page + 1,
            },
            () => {
                this.getHistoryTransaction();
            },
        );
    };

    render() {
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
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 240 }}
                        data={this.state.data}
                        renderItem={({ item }) => (
                            <HistoryTransaction
                                onPress={() =>
                                    this.props.navigation.navigate(
                                        'DetailTransaction',
                                        {
                                            item,
                                        },
                                    )
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
                        onEndReached={this.loadMore}
                    />
                </Container>
            </Scaffold>
        );
    }
}

export default History;

const styles = StyleSheet.create({});
