import { ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'
import { Gap, IDCard, ProgressBar, Scaffold, Text } from '../../components'
import StaticColor from '../../utils/Colors'
import HeaderHome from '../../components/HeaderHome'
import { Container } from '../../styled'

const Overview = ({ navigation }) => {
    return (
        <Scaffold useSafeArea statusBarColor={StaticColor.backgroundColor} showHeader header={<HeaderHome />}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                <Container flex={1} marginHorizontal={24}>
                    <IDCard />
                    <Gap height={20} />
                    <View style={styles.card}>
                        <View style={styles.cardRow}>
                            <Text>Level 1</Text>
                            <Text type="semibold" color="#22B07D">55% of <Text type="semibold">Rp 20.000</Text></Text>
                        </View>
                        <ProgressBar step={7} steps={10} />
                    </View>
                    <Gap height={30} />
                    <Text size={16} type="semibold" align="left">Do Something</Text>
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
    }
})