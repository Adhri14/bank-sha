import { Image, ScrollView, StyleSheet, View } from 'react-native';
import React, { useRef, useState } from 'react';
import StaticColor from '../../utils/Colors';
import {
    Button,
    Scaffold,
    Text,
    TextInput,
    ToastMessage,
} from '../../components';
import { LogoLight } from '../../assets';
import { useCallback } from 'react';
import { loginService } from '../../reducer/actions/auth';
import { saveToLocalStorage } from '../../storage';

const SignIn = ({ navigation }) => {
    const inputRefPassword = useRef(null);
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const onSubmit = useCallback(() => {
        console.log('form : ', form);
        loginService(form)
            .then(res => {
                console.log('res : ', res);
                if (res?.status === 400) {
                    ToastMessage.show({
                        message: `${JSON.stringify(res?.data?.errors)}`,
                        type: 'danger',
                        backgroundColor: StaticColor.errorColor,
                    });
                } else {
                    const data = {
                        token: res.token,
                        pin: res.pin,
                    };
                    saveToLocalStorage('userProfile', data);
                    redirectTo('PIN');
                }
            })
            .catch(err => {
                ToastMessage.show({
                    message: err.message,
                    type: 'danger',
                    backgroundColor: StaticColor.errorColor,
                });
            });
    }, [form]);

    const redirectTo = nav => {
        navigation.replace(nav, { nameScreen: 'sign-in' });
    };

    return (
        <Scaffold
            showHeader={false}
            useSafeArea
            statusBarColor={StaticColor.backgroundColor}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <View style={styles.page}>
                    <Image source={LogoLight} style={styles.logo} />
                    <Text
                        style={{ marginTop: 70, marginBottom: 30 }}
                        align="left"
                        size={20}
                        type="semibold"
                    >
                        {'Sign In &\nGrow Your Finance'}
                    </Text>
                    <View style={styles.containerInput}>
                        <TextInput
                            // ref={inputRefEmail}
                            onSubmitEditing={() =>
                                inputRefPassword?.current?.focus()
                            }
                            value={form.email}
                            label="Email Address"
                            onChangeText={val =>
                                setForm({ ...form, email: val })
                            }
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
                            onChangeText={val =>
                                setForm({ ...form, password: val })
                            }
                            returnKeyType="go"
                            secureTextEntry
                            cursorColor={StaticColor.secondaryColor}
                            selectionColor="rgba(83, 193, 249, 0.4)"
                        />
                        <Text
                            type="regular"
                            style={{ marginTop: -10 }}
                            align="right"
                            color={StaticColor.secondaryColor}
                        >
                            Forgot Password
                        </Text>
                        <Button
                            style={{
                                borderRadius: 30,
                                height: 50,
                                marginTop: 20,
                            }}
                            onPress={onSubmit}
                        >
                            Sign In
                        </Button>
                    </View>
                    <Button
                        onPress={() => navigation.navigate('SignUp')}
                        color={StaticColor.subtitleColor2}
                        style={{
                            height: 50,
                            borderRadius: 50,
                            backgroundColor: 'transparent',
                            marginTop: 20,
                        }}
                    >
                        Create new account
                    </Button>
                </View>
            </ScrollView>
        </Scaffold>
    );
};

export default SignIn;

const styles = StyleSheet.create({
    page: {
        flex: 1,
        paddingHorizontal: 24,
    },
    logo: {
        width: 155,
        height: 50,
        alignSelf: 'center',
        marginTop: 70,
    },
    containerInput: {
        padding: 22,
        backgroundColor: 'white',
        borderRadius: 20,
    },
});
