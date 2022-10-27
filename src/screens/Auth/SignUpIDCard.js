import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import React, { useRef, useState } from 'react';
import StaticColor from '../../utils/Colors';
import {
    Button,
    Scaffold,
    Text,
    TextInput,
    ToastMessage,
} from '../../components';
import { DmPerson1, IcUpload, LogoLight } from '../../assets';
import { launchImageLibrary } from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { registerService } from '../../reducer/actions/auth';
import { CLEAR_REGISTER_REDUCER } from '../../reducer/key';
import { saveToLocalStorage } from '../../storage';

const SignUpIDCard = ({ navigation }) => {
    const register = useSelector(state => state.register);
    const dispatch = useDispatch();

    const onSubmit = useCallback(async () => {
        try {
            const res = await registerService(register);
            const data = {
                token: res.token,
                pin: res.pin,
            };
            await saveToLocalStorage('userProfile', data);
            dispatch({ type: CLEAR_REGISTER_REDUCER });
            navigation.reset({ index: 0, routes: [{ name: 'MainApp' }] });
        } catch (error) {
            console.log('register err : ', error);
            ToastMessage.show({
                message: error,
                type: 'danger',
                backgroundColor: StaticColor.errorColor,
            });
        }
    }, []);

    const takePhoto = async () => {
        try {
            const options = {
                includeBase64: true,
                maxWidth: 500,
                maxHeight: 500,
                quality: 0.6,
            };
            const res = await launchImageLibrary(options);
            const data = res.assets;
            data.map(item => {
                const ktp = `data:${item.type};base64,${item.base64}`;
                dispatch({ type: 'SET_KTP', value: { ktp } });
            });
        } catch (error) {
            console.log('error : ', error);
        }
    };

    return (
        <Scaffold
            showHeader={false}
            useSafeArea={false}
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
                        {'Verify Your\nAccount'}
                    </Text>
                    <View style={styles.containerInput}>
                        <View style={{ marginBottom: 30 }}>
                            <Pressable onPress={takePhoto}>
                                <View style={styles.containerProfile}>
                                    <Image
                                        source={
                                            register.ktp !== ''
                                                ? register.ktp
                                                : IcUpload
                                        }
                                        style={[
                                            {
                                                width:
                                                    register.ktp !== ''
                                                        ? '100%'
                                                        : 32,
                                                height:
                                                    register.ktp !== ''
                                                        ? '100%'
                                                        : 32,
                                                resizeMode:
                                                    register.ktp !== ''
                                                        ? 'cover'
                                                        : 'center',
                                            },
                                        ]}
                                    />
                                </View>
                            </Pressable>
                            <Text size={18}>Passport/ID Card</Text>
                        </View>
                        <Button
                            onPress={() => {
                                if (register.ktp === '') {
                                    ToastMessage.show({
                                        message: `Silahkan upload KTP Anda terlebih dahulu yah. Jika tidak ingin upload KTP, bisa tekan tombol "Skip for now" di bawah ini`,
                                        type: 'danger',
                                        backgroundColor: StaticColor.errorColor,
                                    });
                                } else {
                                    onSubmit();
                                }
                            }}
                            style={{ borderRadius: 30, height: 50 }}
                        >
                            Continue
                        </Button>
                    </View>
                    <Button
                        onPress={onSubmit}
                        color={StaticColor.subtitleColor2}
                        style={{
                            height: 50,
                            borderRadius: 50,
                            backgroundColor: 'transparent',
                            marginTop: 20,
                        }}
                    >
                        Skip for now
                    </Button>
                </View>
            </ScrollView>
        </Scaffold>
    );
};

export default SignUpIDCard;

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
});
