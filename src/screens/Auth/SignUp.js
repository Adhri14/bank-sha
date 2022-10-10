import { Image, ScrollView, StyleSheet, View } from 'react-native'
import React, { useRef, useState } from 'react'
import StaticColor from '../../utils/Colors'
import { Button, Scaffold, Text, TextInput } from '../../components'
import { LogoLight } from '../../assets'

const SignUp = ({ navigation }) => {
    const inputRefName = useRef();
    const inputRefEmail = useRef(null);
    const inputRefPassword = useRef(null);
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    })

    const setChangeValue = (key, val) => {
        setForm({
            ...form,
            [key]: val,
        });
    }

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
                        <TextInput
                            // ref={inputRefName}
                            label="Full name"
                            value={form.name}
                            onChangeText={val => setChangeValue('name', val)}
                            onSubmitEditing={() => inputRefEmail?.current?.focus()}
                            returnKeyType="next"
                            cursorColor={StaticColor.secondaryColor}
                            selectionColor="rgba(83, 193, 249, 0.4)"
                        />
                        <TextInput
                            ref={inputRefEmail}
                            onSubmitEditing={() => inputRefPassword?.current?.focus()}
                            value={form.email}
                            label="Email Address"
                            onChangeText={val => setChangeValue('email', val)}
                            returnKeyType="next"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            cursorColor={StaticColor.secondaryColor}
                            selectionColor="rgba(83, 193, 249, 0.4)"
                        />
                        <TextInput
                            ref={inputRefPassword}
                            // onSubmitEditing={() => inputRefPassword?.current?.focus()}
                            label="Password"
                            value={form.password}
                            onChangeText={val => setChangeValue('password', val)}
                            returnKeyType="go"
                            secureTextEntry
                            cursorColor={StaticColor.secondaryColor}
                            selectionColor="rgba(83, 193, 249, 0.4)"
                        />
                        <Button style={{ borderRadius: 30, height: 50 }} onPress={() => navigation.replace('SignUpProfile')}>
                            Continue
                        </Button>
                    </View>
                    <Button
                        onPress={() => navigation.navigate('SignIn')}
                        color={StaticColor.subtitleColor2}
                        style={{
                            height: 50,
                            borderRadius: 50,
                            backgroundColor: 'transparent',
                            marginTop: 20
                        }}>
                        Sign In
                    </Button>
                </View>
            </ScrollView>
        </Scaffold>
    )
}

export default SignUp

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
    }
})