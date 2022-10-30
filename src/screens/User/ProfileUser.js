import { Image, Pressable, StyleSheet, View } from 'react-native';
import React, { useCallback } from 'react';
import { Gap, Scaffold, Text } from '../../components';
import { Card, Container, Row } from '../../styled';
import {
    DmPerson1,
    IcCheck,
    IcEditProfile,
    IcHelp,
    IcLogout,
    IcMyReward,
    IcPin,
    IcWallet,
} from '../../assets';
import StaticColor from '../../utils/Colors';
import { logoutService } from '../../reducer/actions/auth';
import {
    getDataFromLocalStorge,
    removeDataFromLocalStorage,
} from '../../storage';
import { useSelector } from 'react-redux';

const RenderIcon = ({ onPress, title, icon }) => {
    return (
        <Pressable onPress={onPress}>
            <Container paddingVertical={15}>
                <Row>
                    <Image source={icon} style={styles.icon} />
                    <Text>{title}</Text>
                </Row>
            </Container>
        </Pressable>
    );
};

const ProfileUser = ({ navigation }) => {
    const { user } = useSelector(state => state.user);
    const onLogout = useCallback(async () => {
        try {
            const { token } = await getDataFromLocalStorge('userProfile');
            const res = await logoutService(token);
            console.log('hasil : ', res);
            removeDataFromLocalStorage(['userProfile']);

            navigation.reset({ index: 0, routes: [{ name: 'SignIn' }] });
        } catch (error) {
            console.log(error);
        }
    }, []);
    return (
        <Scaffold useSafeArea showHeader headerTitle="My Profile" scrollEnabled>
            <Container
                flex={1}
                marginHorizontal={28}
                marginTop={20}
                // paddingBottom={}
            >
                <Card
                    paddingTop={22}
                    paddingBottom={26}
                    paddingHorizontal={30}
                    radius={20}
                >
                    <View style={styles.containerProfile}>
                        {user?.verified === 1 && (
                            <Image source={IcCheck} style={styles.verified} />
                        )}
                        <Image
                            source={{ uri: user?.profile_picture }}
                            style={styles.profile}
                        />
                    </View>
                    <Gap height={16} />
                    <Text type="medium" size={18}>
                        {user?.name}
                    </Text>
                    <Gap height={40} />
                    <RenderIcon
                        icon={IcEditProfile}
                        title="Edit Profile"
                        onPress={() =>
                            navigation.navigate('PIN', {
                                nameScreen: 'edit-profile',
                            })
                        }
                    />
                    <RenderIcon
                        icon={IcPin}
                        title="My PIN"
                        onPress={() =>
                            navigation.navigate('PIN', {
                                nameScreen: 'edit-pin',
                            })
                        }
                    />
                    <RenderIcon icon={IcWallet} title="Wallet Settings" />
                    <RenderIcon icon={IcMyReward} title="My Rewards" />
                    <RenderIcon icon={IcHelp} title="Help Center" />
                    <RenderIcon
                        icon={IcLogout}
                        title="Log Out"
                        onPress={onLogout}
                    />
                </Card>
                <View style={styles.footer}>
                    <Text
                        size={16}
                        type="regular"
                        color={StaticColor.subtitleColor2}
                    >
                        Report a Problem
                    </Text>
                </View>
            </Container>
        </Scaffold>
    );
};

export default ProfileUser;

const styles = StyleSheet.create({
    containerProfile: {
        width: 120,
        height: 120,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 120 / 2,
        position: 'relative',
    },
    profile: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 120 / 2,
    },
    verified: {
        position: 'absolute',
        zIndex: 99,
        top: 10,
        right: 0,
    },
    icon: {
        width: 24,
        height: 24,
        marginRight: 18,
    },
    footer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
