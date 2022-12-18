import { Image, StyleSheet } from 'react-native';
import React from 'react';
import { Gap, Scaffold, Text } from '../../components';
import { Card, Column, Container, Row } from '../../styled';
import { IcTCat1, IcTCat2, IcTCat3, IcTCat4, IcTCat5 } from '../../assets';
import StaticColor from '../../utils/Colors';
import FormatMoney from '../../utils/FormatMoney';
import moment from 'moment';
import 'moment/locale/id';

const DetailTransaction = ({ route }) => {
    const { item } = route.params;
    console.log('cek : ', item);
    return (
        <Scaffold
            useSafeArea
            scrollEnabled
            showHeader
            headerTitle="Detail Transaction"
        >
            <Container flex={1} marginHorizontal={24} marginTop={20}>
                <Card radius={20} padding={24}>
                    <Row>
                        <Image
                            source={
                                item.transaction_type.code === 'top_up' ||
                                item.transaction_type.code === 'receive'
                                    ? IcTCat1
                                    : item.transaction_type.code === 'internet'
                                    ? IcTCat5
                                    : item.transaction_type.code === 'transfer'
                                    ? IcTCat4
                                    : IcTCat5
                            }
                            style={styles.icon}
                        />
                        <Gap width={10} />
                        <Column>
                            <Text align="left" size={18} type="semibold">
                                {item.transaction_type.code === 'top_up'
                                    ? 'Top Up'
                                    : item.transaction_type.code === 'internet'
                                    ? 'Electric'
                                    : item.transaction_type.code === 'receive'
                                    ? 'Receive'
                                    : 'Transfer'}
                            </Text>
                            <Gap height={5} />
                            <Text
                                align="left"
                                size={12}
                                color={StaticColor.subtitleColor}
                            >
                                Bank BWA
                            </Text>
                        </Column>
                    </Row>
                    <Gap height={30} />
                    <Row justify="space-between">
                        <Text align="left" size={16} type="semibold">
                            Total
                        </Text>
                        <Text
                            align="right"
                            size={16}
                            type="semibold"
                            color={StaticColor.primaryColor}
                        >
                            {FormatMoney.getFormattedMoney(item.amount)}
                        </Text>
                    </Row>
                    <Gap height={20} />
                    <Row justify="space-between">
                        <Text align="left" size={14} type="medium">
                            No. Ref
                        </Text>
                        <Text align="right" size={14} type="medium">
                            {item.transaction_code}
                        </Text>
                    </Row>
                    <Gap height={15} />
                    <Row justify="space-between">
                        <Text align="left" size={14} type="medium">
                            Date
                        </Text>
                        <Text align="right" size={14} type="medium">
                            {moment(item.created_at).format('DD MMMM YYYY')}
                        </Text>
                    </Row>
                    <Gap height={15} />
                    <Row justify="space-between">
                        <Text align="left" size={14} type="medium">
                            Time
                        </Text>
                        <Text align="right" size={14} type="medium">
                            {moment(item.update_at).format('kk:mm:ss')}
                        </Text>
                    </Row>
                    <Gap height={15} />
                    <Row justify="space-between">
                        <Text align="left" size={14} type="medium">
                            Status
                        </Text>
                        <Text
                            align="right"
                            size={14}
                            type="medium"
                            color={
                                item.status === 'success'
                                    ? StaticColor.secondaryColor
                                    : StaticColor.errorColor
                            }
                        >
                            {item.status}
                        </Text>
                    </Row>
                </Card>
            </Container>
        </Scaffold>
    );
};

export default DetailTransaction;

const styles = StyleSheet.create({
    icon: {
        width: 60,
        height: 60,
    },
});
