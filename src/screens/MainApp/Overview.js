import {
    Animated,
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import {
    CardBlog,
    CardPeople,
    Gap,
    HistoryTransaction,
    IDCard,
    ProgressBar,
    Scaffold,
    ShorcutItem,
    Text,
} from '../../components';
import StaticColor from '../../utils/Colors';
import HeaderHome from '../../components/HeaderHome';
import { Container, Row } from '../../styled';
import {
    DmPerson1,
    DmTips1,
    DmTips2,
    DmTips3,
    DmTips4,
    IcData,
    IcFood,
    IcMore,
    IcMovie,
    IcSend,
    IcStream,
    IcTCat1,
    IcTCat2,
    IcTCat3,
    IcTCat4,
    IcTCat5,
    IcTopUp,
    IcTravel,
    IcWater,
    IcWithdraw,
} from '../../assets';
import { useDispatch, useSelector } from 'react-redux';
import { transactionAction } from '../../reducer/actions/transaction';
import { tipsAction } from '../../reducer/actions/tips';
import FormatMoney from '../../utils/FormatMoney';
import { useCallback } from 'react';

const ModalMore = ({ visible, onRequestClose, onPress, children }) => {
    const animBackDrop = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            Animated.timing(animBackDrop, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(animBackDrop, {
                toValue: 0,
                duration: 600,
                useNativeDriver: true,
            }).start();
        }
    }, [visible]);

    return (
        <Modal
            animationType="slide"
            transparent
            visible={visible}
            onRequestClose={onRequestClose}
        >
            <Animated.View style={[styles.backdrop, { opacity: animBackDrop }]}>
                <Pressable
                    onPress={onPress}
                    style={{ flex: 1, justifyContent: 'flex-end' }}
                >
                    <View style={styles.content}>
                        <Text align="left" type="semibold" size={16}>
                            Do More With Us
                        </Text>
                        <Gap height={14} />
                        {children}
                    </View>
                </Pressable>
            </Animated.View>
        </Modal>
    );
};

const Overview = ({ navigation }) => {
    const { user } = useSelector(state => state.user);
    const { data } = useSelector(state => state.transactions);
    const { tips } = useSelector(state => state.tips);
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    const [xp, setXp] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        setXp(5.5);
        dispatch(transactionAction());
        dispatch(tipsAction());
        reduceTopUp();
    }, []);

    const findTopUp = data.find(
        item => item.transaction_type.code === 'top_up',
    );
    const findInternet = data.find(
        item => item.transaction_type.code === 'internet',
    );
    const findTransfer = data.find(
        item => item.transaction_type.code === 'transfer',
    );

    const reduceTopUp = check => {
        console.log('find : ', findTopUp);
    };

    return (
        <Scaffold
            useSafeArea
            statusBarColor={StaticColor.backgroundColor}
            showHeader
            header={
                <HeaderHome
                    name={user?.name}
                    img={{ uri: user.profile_picture }}
                    onPress={() => navigation.navigate('ProfileUser')}
                    isVerified={user?.verified}
                />
            }
            scrollEnabled
            contentContainerStyle={{ paddingBottom: 30 }}
        >
            <ModalMore
                visible={visible}
                onRequestClose={() => setVisible(!visible)}
                onPress={() => setVisible(!visible)}
            >
                <Row justify="space-between" align="flex-start">
                    <ShorcutItem
                        title="Data"
                        icon={IcData}
                        onPress={() => {
                            setVisible(!visible);
                            navigation.navigate('BuyPulsa');
                        }}
                    />
                    <ShorcutItem title="Water" icon={IcWater} />
                    <ShorcutItem title="Stream" icon={IcStream} />
                </Row>
                <Gap height={30} />
                <Row justify="space-between" align="flex-start">
                    <ShorcutItem title="Movie" icon={IcMovie} />
                    <ShorcutItem title="Food" icon={IcFood} />
                    <ShorcutItem title="Travel" icon={IcTravel} />
                </Row>
            </ModalMore>
            <Container flex={1} marginHorizontal={24}>
                <IDCard
                    cardNumber={user?.card_number.slice(12)}
                    balance={user?.balance}
                    username={user?.username}
                />
                <Gap height={20} />
                <View style={styles.card}>
                    <View style={styles.cardRow}>
                        <Text>Level 1</Text>
                        <Text type="semibold" color="#22B07D">
                            55% of{' '}
                            <Text type="semibold">
                                {FormatMoney.getFormattedMoney(20000, 'Rp')}
                            </Text>
                        </Text>
                    </View>
                    <ProgressBar step={xp} steps={10} />
                </View>
                <Gap height={30} />
                <Text size={16} type="semibold" align="left">
                    Do Something
                </Text>
                <Gap height={14} />
                <Row justify="space-between" align="flex-start">
                    <ShorcutItem
                        title="Top Up"
                        icon={IcTopUp}
                        onPress={() => navigation.navigate('TopUp')}
                    />
                    <ShorcutItem
                        title="Send"
                        icon={IcSend}
                        onPress={() => navigation.navigate('Transfer')}
                    />
                    <ShorcutItem title="Withdraw" icon={IcWithdraw} />
                    <ShorcutItem
                        onPress={() => setVisible(true)}
                        title="More"
                        icon={IcMore}
                    />
                </Row>
                {data.length > 0 && (
                    <>
                        <Gap height={30} />
                        <Text size={16} type="semibold" align="left">
                            Latest Transactions
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
                            {findTopUp && (
                                <HistoryTransaction
                                    icon={IcTCat1}
                                    type="Top Up"
                                    time="Today"
                                    value={FormatMoney.getFormattedMoney(
                                        findTopUp?.amount,
                                        '+',
                                    )}
                                />
                            )}
                            {findTransfer && (
                                <HistoryTransaction
                                    icon={IcTCat4}
                                    type="Send"
                                    time="Today"
                                    value={FormatMoney.getFormattedMoney(
                                        findTransfer?.amount,
                                        '-',
                                    )}
                                />
                            )}
                            {findInternet && (
                                <HistoryTransaction
                                    icon={IcTCat5}
                                    type="Electric"
                                    time="Today"
                                    value={FormatMoney.getFormattedMoney(
                                        findInternet?.amount,
                                        '-',
                                    )}
                                />
                            )}
                        </View>
                    </>
                )}
                <Gap height={30} />
                <Text size={16} type="semibold" align="left">
                    Send Again
                </Text>
                <ScrollView
                    pagingEnabled
                    scrollEventThrottle={32}
                    horizontal
                    contentContainerStyle={{ paddingVertical: 14 }}
                    showsHorizontalScrollIndicator={false}
                >
                    <CardPeople name="@yuanita" image={DmPerson1} />
                    <CardPeople name="@yuanita" image={DmPerson1} />
                    <CardPeople name="@yuanita" image={DmPerson1} />
                    <CardPeople name="@yuanita" image={DmPerson1} />
                    <CardPeople name="@yuanita" image={DmPerson1} />
                    <CardPeople name="@yuanita" image={DmPerson1} />
                </ScrollView>
                {tips.length > 0 && (
                    <>
                        <Gap height={26} />
                        <Text size={16} type="semibold" align="left">
                            Friendly Tips
                        </Text>
                        <Container marginTop={14}>
                            <Row
                                style={{ flexWrap: 'wrap' }}
                                justify="space-between"
                            >
                                {tips.map((item, index) => (
                                    <CardBlog
                                        key={index.toString()}
                                        title="Best tips for using a credit card"
                                        image={DmTips1}
                                    />
                                ))}
                            </Row>
                        </Container>
                    </>
                )}
            </Container>
        </Scaffold>
    );
};

export default Overview;

const styles = StyleSheet.create({
    card: {
        padding: 22,
        backgroundColor: 'white',
        borderRadius: 20,
    },
    cardRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    backdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        paddingVertical: 24,
        backgroundColor: 'rgba(20,25,23,0.8)',
        paddingHorizontal: 24,
    },
    content: {
        padding: 30,
        backgroundColor: StaticColor.backgroundColor,
        borderRadius: 40,
    },
});
