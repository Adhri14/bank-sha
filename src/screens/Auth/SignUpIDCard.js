import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native'
import React, { useRef, useState } from 'react'
import StaticColor from '../../utils/Colors'
import { Button, Scaffold, Text, TextInput } from '../../components'
import { DmPerson1, IcUpload, LogoLight } from '../../assets'

const SignUpIDCard = ({ navigation }) => {
    const uri = DmPerson1;

    return (
        <Scaffold
            showHeader={false}
            useSafeArea={false}
            statusBarColor={StaticColor.backgroundColor}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.page}>
                    <Image source={LogoLight} style={styles.logo} />
                    <Text style={{ marginTop: 70, marginBottom: 30 }} align="left" size={20} type='semibold'>{'Verify Your\nAccount'}</Text>
                    <View style={styles.containerInput}>
                        <View style={{ marginBottom: 30 }}>
                            <Pressable>
                                <View style={styles.containerProfile}>
                                    <Image source={uri !== '' ? uri : IcUpload} style={[{ width: uri !== '' ? '100%' : 32, height: uri !== '' ? '100%' : 32, resizeMode: uri !== '' ? 'cover' : 'center' }]} />
                                </View>
                            </Pressable>
                            <Text size={18}>Passport/ID Card</Text>
                        </View>
                        <Button style={{ borderRadius: 30, height: 50 }}>
                            Continue
                        </Button>
                    </View>
                    <Button
                        color={StaticColor.subtitleColor2}
                        style={{
                            height: 50,
                            borderRadius: 50,
                            backgroundColor: 'transparent',
                            marginTop: 20
                        }}>
                        Skip for now
                    </Button>
                </View>
            </ScrollView>
        </Scaffold>
    )
}

export default SignUpIDCard

const styles = StyleSheet.create({
    page: {
        flex: 1,
        paddingHorizontal: 24
    },
    logo: {
        width: 155,
        height: 50,
        alignSelf: 'center',
        marginTop: 70
    },
    containerInput: {
        padding: 22,
        backgroundColor: "white",
        borderRadius: 20
    },
    containerProfile: {
        width: '100%',
        height: 170,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: StaticColor.backgroundColor2,
        borderRadius: 20,
        marginBottom: 10,
    },
})