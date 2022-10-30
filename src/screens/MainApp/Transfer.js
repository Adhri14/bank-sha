import React, { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, View } from 'react-native';
import {
    Button,
    Gap,
    Scaffold,
    Text,
    TextInput,
    ToastMessage,
} from '../../components';
import { Container, Row } from '../../styled';
import StaticColor from '../../utils/Colors';
import FormatMoney from '../../utils/FormatMoney';
import { getDataFromLocalStorge } from '../../storage';
import axios from 'axios';
import { API_URL } from '../../services/config';
import { IcCheck } from '../../assets';

const Transfer = ({ navigation }) => {
    const [currentIndex, setCurrentIndex] = useState(null);
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const timeOut = setTimeout(() => {
            if (search !== '') {
                getUsers();
            } else {
                setUsers([]);
            }
        }, 1000);

        return () => timeOut;
    }, [search]);

    const getUsers = () => {
        getDataFromLocalStorge('userProfile').then(token => {
            axios
                .get(`${API_URL}/users/${search}`, {
                    headers: { Authorization: `Bearer ${token.token}` },
                })
                .then(res => {
                    console.log('user : ', res.data);

                    setUsers(res.data);
                })
                .catch(err => {
                    setTimeout(() => {
                        ToastMessage.show({
                            message: err.response.data.message,
                            backgroundColor: StaticColor.errorColor,
                            type: 'danger',
                        });
                    }, 1500);
                    console.log(err.response);
                    setUsers([]);
                });
        });
    };

    const onSubmit = () => {
        navigation.navigate('TopUpAmount', {
            code: currentIndex,
            nameScreen: 'transfer',
        });
    };

    return (
        <>
            <Scaffold
                showHeader
                headerTitle="Transfer"
                useSafeArea
                statusBarColor={StaticColor.backgroundColor}
                scrollEnabled
                contentContainerStyle={{ paddingBottom: 30 }}
            >
                <Container flex={1} marginHorizontal={24}>
                    <Gap height={30} />
                    <TextInput
                        label="Search"
                        size={16}
                        type="semibold"
                        styleInput={{ backgroundColor: 'white' }}
                        placeholder="by username"
                        value={search}
                        onChangeText={val => setSearch(val)}
                    />
                    <Gap height={30} />
                    {users.length > 0 ? (
                        <>
                            <Text align="left" size={16} type="semibold">
                                Result
                            </Text>
                            <Gap height={10} />
                            <Row
                                justify="space-between"
                                style={{ flexWrap: 'wrap' }}
                            >
                                {users.map((item, index) => (
                                    <Pressable
                                        key={item.id.toString()}
                                        style={[
                                            styles.select,
                                            {
                                                borderColor:
                                                    currentIndex ===
                                                    item.username
                                                        ? StaticColor.secondaryColor
                                                        : 'white',
                                            },
                                        ]}
                                        onPress={() =>
                                            setCurrentIndex(item.username)
                                        }
                                    >
                                        <View style={styles.wrapperImage}>
                                            <Image
                                                source={IcCheck}
                                                style={styles.check}
                                            />
                                            <Image
                                                source={{
                                                    uri: item.profile_picture,
                                                }}
                                                style={styles.image}
                                            />
                                        </View>
                                        <Text
                                            size={16}
                                            type="medium"
                                            numberOfLines={1}
                                        >
                                            {item.name}
                                        </Text>
                                        <Gap height={5} />
                                        <Text
                                            size={12}
                                            type="regular"
                                            color={StaticColor.subtitleColor}
                                            numberOfLines={1}
                                        >
                                            @{item.username}
                                        </Text>
                                    </Pressable>
                                ))}
                            </Row>
                        </>
                    ) : (
                        <Text
                            align="center"
                            size={16}
                            type="semibold"
                            color={StaticColor.subtitleColor}
                        >
                            Silahkan cari user yang ingin anda transfer kan
                        </Text>
                    )}
                    <Gap flex={1} />
                </Container>
            </Scaffold>
            {currentIndex !== null && (
                <View
                    style={{
                        position: 'absolute',
                        bottom: 30,
                        left: 24,
                        right: 24,
                    }}
                >
                    <Button onPress={onSubmit}>Continue</Button>
                </View>
            )}
        </>
    );
};

export default Transfer;

const styles = StyleSheet.create({
    wallet: {
        width: 80,
        height: 55,
        marginRight: 16,
    },
    select: {
        padding: 22,
        backgroundColor: 'white',
        width: 158,
        marginBottom: 18,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'white',
        height: 171,
        justifyContent: 'center',
        alignItems: 'center',
    },
    wrapperImage: {
        width: 70,
        height: 70,
        borderRadius: 70 / 2,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        alignSelf: 'center',
        marginBottom: 10,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 70 / 2,
    },
    check: {
        width: 14,
        height: 14,
        position: 'absolute',
        zIndex: 999,
        top: 10,
        right: -2,
    },
});
