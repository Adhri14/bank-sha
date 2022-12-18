import { StyleSheet, View } from 'react-native';
import React from 'react';
import {
    Button,
    Gap,
    Scaffold,
    Text,
    TextInput,
    ToastMessage,
    ScreenIndicator,
} from '../../components';
import { Card, Container } from '../../styled';
import StaticColor from '../../utils/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useCallback } from 'react';
import { updatePINService, userService } from '../../reducer/actions/user';
import { getDataFromLocalStorge, saveToLocalStorage } from '../../storage';
import { SET_USER } from '../../reducer/key';

const EditPinUser = ({ navigation }) => {
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState({
        previous_pin: '',
        new_pin: '',
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
            const res = await updatePINService(form, token);
            if (res?.status === 400) {
                console.log('error : ', res?.data);
                setIsLoading(false);
                return ToastMessage.show({
                    message: `${res?.data?.message}`,
                    type: 'danger',
                    backgroundColor: StaticColor.errorColor,
                });
            }
            const userResult = await userService(token);

            const data = {
                token,
                pin: userResult.pin,
            };
            saveToLocalStorage('userProfile', data);
            navigation.replace('SuccessUpdate');
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
        setIsLoading(false);
    }, [form]);

    if (isLoading) return <ScreenIndicator />;

    return (
        <Scaffold
            useSafeArea
            showHeader
            headerTitle="Edit PIN"
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
                        label="Old PIN"
                        value={form.previous_pin}
                        keyboardType="number-pad"
                        onChangeText={val => onChangeText('previous_pin', val)}
                        maxLength={6}
                    />
                    <TextInput
                        label="New PIN"
                        value={form.new_pin}
                        keyboardType="number-pad"
                        onChangeText={val => onChangeText('new_pin', val)}
                        maxLength={6}
                    />
                    <Gap height={20} />
                    <Button onPress={onSubmit}>Update Now</Button>
                </Card>
            </Container>
        </Scaffold>
    );
};

export default EditPinUser;

const styles = StyleSheet.create({});
