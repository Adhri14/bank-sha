import { StyleSheet, View } from 'react-native';
import React from 'react';
import {
    Button,
    Gap,
    Scaffold,
    Text,
    TextInput,
    ScreenIndicator,
} from '../../components';
import { Card, Container } from '../../styled';
import StaticColor from '../../utils/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useCallback } from 'react';
import { updateUserService, userService } from '../../reducer/actions/user';
import { getDataFromLocalStorge } from '../../storage';
import { SET_USER } from '../../reducer/key';

const EditProfileUser = ({ navigation }) => {
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState({
        username: user?.username,
        name: user?.name,
        email: user?.email,
        password: user?.password,
    });

    const onChangeText = (key, val) => {
        setForm({
            ...form,
            [key]: val,
        });
    };

    const onSubmit = useCallback(async () => {
        setIsLoading(true);
        try {
            const { token } = await getDataFromLocalStorge('userProfile');
            await updateUserService(form, token);
            const res = await userService(token);
            dispatch({ type: SET_USER, value: { user: res } });
            navigation.replace('SuccessUpdate');
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    }, [form]);

    if (isLoading) return <ScreenIndicator />;

    return (
        <Scaffold
            useSafeArea
            showHeader
            headerTitle="Edit Profile"
            scrollEnabled
            onPressLeftButton={() => navigation.goBack()}
        >
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
                    <TextInput
                        label="Username"
                        value={form.username}
                        onChangeText={val => onChangeText('username', val)}
                    />
                    <TextInput
                        label="Full Name"
                        value={form.name}
                        onChangeText={val => onChangeText('name', val)}
                    />
                    <TextInput
                        editable={false}
                        label="Email Address"
                        disabled
                        value={form.email}
                        onChangeText={val => onChangeText('email', val)}
                    />
                    <Gap height={20} />
                    <Button onPress={onSubmit}>Update Now</Button>
                </Card>
            </Container>
        </Scaffold>
    );
};

export default EditProfileUser;

const styles = StyleSheet.create({});
