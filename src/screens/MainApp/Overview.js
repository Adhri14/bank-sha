import { Animated, Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Gap, HistoryTransaction, IDCard, ProgressBar, Scaffold, ShorcutItem, Text } from '../../components'
import StaticColor from '../../utils/Colors'
import HeaderHome from '../../components/HeaderHome'
import { Container, Row } from '../../styled'
import { IcData, IcFood, IcMore, IcMovie, IcSend, IcStream, IcTCat1, IcTCat2, IcTCat3, IcTCat4, IcTCat5, IcTopUp, IcTravel, IcWater, IcWithdraw } from '../../assets'

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
    }, [visible])

    return (
        <Modal animationType='slide' transparent visible={visible} onRequestClose={onRequestClose}>
            <Animated.View style={[styles.backdrop, { opacity: animBackDrop }]}>
                <Pressable onPress={onPress} style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <View style={styles.content}>
                        <Text align="left" type="semibold" size={16}>Do More With Us</Text>
                        <Gap height={14} />
                        {children}
                    </View>
                </Pressable>
            </Animated.View>
        </Modal>
    )
}

const Overview = ({ navigation }) => {
    const [visible, setVisible] = useState(false);
    const [xp, setXp] = useState(0);

    useEffect(() => {
        setXp(5.5);
    }, [])

    return (
        <Scaffold useSafeArea statusBarColor={StaticColor.backgroundColor} showHeader header={<HeaderHome />}>
            <ModalMore visible={visible} onRequestClose={() => setVisible(!visible)} onPress={() => setVisible(!visible)}>
                <Row justify="space-between" align="flex-start">
                    <ShorcutItem title="Data" icon={IcData} />
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
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }} showsVerticalScrollIndicator={false}>
                <Container flex={1} marginHorizontal={24}>
                    <IDCard />
                    <Gap height={20} />
                    <View style={styles.card}>
                        <View style={styles.cardRow}>
                            <Text>Level 1</Text>
                            <Text type="semibold" color="#22B07D">55% of <Text type="semibold">Rp 20.000</Text></Text>
                        </View>
                        <ProgressBar step={xp} steps={10} />
                    </View>
                    <Gap height={30} />
                    <Text size={16} type="semibold" align="left">Do Something</Text>
                    <Gap height={14} />
                    <Row justify="space-between" align="flex-start">
                        <ShorcutItem title="Top Up" icon={IcTopUp} />
                        <ShorcutItem title="Send" icon={IcSend} />
                        <ShorcutItem title="Withdraw" icon={IcWithdraw} />
                        <ShorcutItem onPress={() => setVisible(true)} title="More" icon={IcMore} />
                    </Row>
                    <Gap height={30} />
                    <Text size={16} type="semibold" align="left">Latest Transactions</Text>
                    <Gap height={14} />
                    <View style={[styles.content, { backgroundColor: 'white', borderRadius: 20, padding: 22, paddingTop: 4 }]}>
                        <HistoryTransaction icon={IcTCat1} type="Top Up" time="Yesterday" value="+ 450.000" />
                        <HistoryTransaction icon={IcTCat2} type="Cashback" time="Sep 11" value="+ 22.000" />
                        <HistoryTransaction icon={IcTCat3} type="Withdraw" time="Sep 2" value="- 5.000" />
                        <HistoryTransaction icon={IcTCat4} type="Transfer" time="Aug 11" value="- 123.500" />
                        <HistoryTransaction icon={IcTCat5} type="Electric" time="Feb 11" value="- 12.300.000" />
                    </View>
                </Container>
            </ScrollView>
        </Scaffold>
    )
}

export default Overview

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
        marginBottom: 10
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
    }
})