import { Image, ScrollView, StyleSheet, View } from 'react-native';
import React, { useRef, useState } from 'react';
import StaticColor from '../../utils/Colors';
import {
    Button,
    Scaffold,
    ScreenIndicator,
    Text,
    TextInput,
    ToastMessage,
} from '../../components';
import { LogoLight } from '../../assets';
import { useCallback } from 'react';
import { loginService } from '../../reducer/actions/auth';
import { saveToLocalStorage } from '../../storage';
import { userService } from '../../reducer/actions/user';
import axios from 'axios';
import { API_URL } from '../../services/config';
import { useDispatch } from 'react-redux';
import { SET_USER } from '../../reducer/key';

const SignIn = ({ navigation }) => {
    const inputRefPassword = useRef(null);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const onSubmit = useCallback(() => {
        setIsLoading(true);
        loginService(form)
            .then(res => {
                if (res?.status === 400) {
                    setIsLoading(false);
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
                    axios
                        .get(`${API_URL}/users`, {
                            headers: { Authorization: `Bearer ${data.token}` },
                        })
                        .then(result => {
                            setIsLoading(false);
                            dispatch({
                                type: SET_USER,
                                value: { user: result.data },
                            });
                            // redirectTo('MainApp');
                            redirectTo('PIN');
                        })
                        .catch(errr => {
                            setIsLoading(false);
                            console.log('error nya : ', errr.response);
                        });
                    saveToLocalStorage('userProfile', data);
                }
            })
            .catch(err => {
                setIsLoading(false);
                ToastMessage.show({
                    message: err.message,
                    type: 'danger',
                    backgroundColor: StaticColor.errorColor,
                });
            });
    }, [form, setIsLoading]);

    const redirectTo = nav => {
        navigation.reset({
            index: 0,
            routes: [{ name: nav, params: { nameScreen: 'sign-in' } }],
        });
    };

    if (isLoading) return <ScreenIndicator />;

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
