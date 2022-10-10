import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native'
import React, { useRef, useState } from 'react'
import StaticColor from '../../utils/Colors'
import { Button, Scaffold, Text, TextInput } from '../../components'
import { DmPerson1, IcUpload, LogoLight } from '../../assets'

const SignUpProfile = ({ navigation }) => {
    const [pin, setPin] = useState('');
    const uri = DmPerson1;

    return (
        <Scaffold
            showHeader={false}
            useSafeArea={false}
            statusBarColor={StaticColor.backgroundColor}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.page}>
                    <Image source={LogoLight} style={styles.logo} />
                    <Text style={{ marginTop: 70, marginBottom: 30 }} align="left" size={20} type='semibold'>{'Join Us to Unlock\nYour Growth'}</Text>
                    <View style={styles.containerInput}>
                        <View style={{ marginBottom: 30 }}>
                            <Pressable>
                                <View style={styles.containerProfile}>
                                    <Image source={uri !== '' ? uri : IcUpload} style={[styles.profile, { width: uri !== '' ? '100%' : 32, height: uri !== '' ? '100%' : 32, resizeMode: uri !== '' ? 'cover' : 'center' }]} />
                                </View>
                            </Pressable>
                            <Text size={18}>Shayna Hanna</Text>
                        </View>
                        <TextInput
                            // onSubmitEditing={() => inputRefPassword?.current?.focus()}
                            label="Set PIN (6 digit number)"
                            value={pin}
                            onChangeText={val => setPin(val)}
                            returnKeyType="go"
                            cursorColor={StaticColor.secondaryColor}
                            selectionColor="rgba(83, 193, 249, 0.4)"
                        />
                        <Button style={{ borderRadius: 30, height: 50 }} onPress={() => navigation.replace('SignUpIDCard')}>
                            Continue
                        </Button>
                    </View>
                </View>
            </ScrollView>
        </Scaffold>
    )
}

export default SignUpProfile

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
        width: 120,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: StaticColor.backgroundColor2,
        borderRadius: 120 / 2,
        marginBottom: 10,
    },
    profile: {
        width: 32,
        height: 32,
        resizeMode: 'center',
    }
})