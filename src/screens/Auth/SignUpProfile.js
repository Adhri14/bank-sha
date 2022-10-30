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
import { useDispatch, useSelector } from 'react-redux';
import { SET_REGISTER_PROFILE_WITH_PIN } from '../../reducer/key';
import { launchImageLibrary } from 'react-native-image-picker';

const SignUpProfile = ({ navigation }) => {
    const [pin, setPin] = useState('');
    const [profile_picture, setProfilePicture] = useState('');
    const dispatch = useDispatch();

    const onSubmit = () => {
        if (pin !== '' && profile_picture !== '') {
            dispatch({
                type: SET_REGISTER_PROFILE_WITH_PIN,
                value: { pin, profile_picture },
            });
            navigation.navigate('SignUpIDCard');
        } else {
            ToastMessage.show({
                message: 'Input harus diisi yah!',
                type: 'danger',
                backgroundColor: StaticColor.errorColor,
            });
        }
    };

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
                setProfilePicture(`data:${item.type};base64,${item.base64}`);
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
                        {'Join Us to Unlock\nYour Growth'}
                    </Text>
                    <View style={styles.containerInput}>
                        <View style={{ marginBottom: 30 }}>
                            <Pressable onPress={takePhoto}>
                                <View style={styles.containerProfile}>
                                    <Image
                                        source={
                                            profile_picture !== ''
                                                ? { uri: profile_picture }
                                                : IcUpload
                                        }
                                        style={[
                                            styles.profile,
                                            {
                                                width:
                                                    profile_picture !== ''
                                                        ? '100%'
                                                        : 32,
                                                height:
                                                    profile_picture !== ''
                                                        ? '100%'
                                                        : 32,
                                                resizeMode:
                                                    profile_picture !== ''
                                                        ? 'cover'
                                                        : 'center',
                                            },
                                        ]}
                                    />
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
                            maxLength={6}
                            keyboardType="number-pad"
                        />
                        <Button
                            style={{ borderRadius: 30, height: 50 }}
                            onPress={onSubmit}
                        >
                            Continue
                        </Button>
                    </View>
                </View>
            </ScrollView>
        </Scaffold>
    );
};

export default SignUpProfile;

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
        width: 120,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: StaticColor.backgroundColor2,
        borderRadius: 120 / 2,
        marginBottom: 10,
        overflow: 'hidden',
    },
    profile: {
        width: 32,
        height: 32,
        resizeMode: 'center',
        // borderRadius: 100,
    },
});
