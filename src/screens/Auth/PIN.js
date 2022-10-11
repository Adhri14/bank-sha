import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, Vibration, View } from 'react-native';
import Svg, { Path } from "react-native-svg";
import { Button, Scaffold, Text, ToastMessage } from '../../components';
import StaticColor from "../../utils/Colors";

const PIN = ({ navigation, route }) => {
    const { nameScreen } = route.params;
    let myPin = '123456'
    const [pin, setPin] = useState('');

    const numpad = [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }, { id: '5' }, { id: '6' }, { id: '7' }, { id: '8' }, { id: '9' },];

    useEffect(() => {
        if (pin.length === 6) {
            if (pin !== myPin) {
                Vibration.vibrate(1000);
                ToastMessage.show({
                    message: 'PIN yang anda masukkan salah. Silakan coba lagi.',
                    backgroundColor: StaticColor.errorColor,
                    type: 'error',
                });
            } else {
                ToastMessage.show({
                    message: 'PIN anda sesuai',
                    backgroundColor: StaticColor.primaryColor,
                });
                if (nameScreen === 'sign-in') {
                    navigation.replace('MainApp');
                }
            }
        }
    }, [pin])

    const addPIN = (val) => {
        if (pin.length < 6) {
            let newPIN = pin + val;
            setPin(newPIN);
        }
    }

    const removePIN = () => {
        let newPIN = pin.substring(0, pin.length - 1); // 6 - 1 > 5 - 1 > 4 - 1 > 3 -> menggunkan substring untuk memotong string dari PIN
        setPin(newPIN);
    }

    let pinStrToArr = pin.split(''); // 12345 > ['1', '2', '3', '4', '5'] > * * * * * -> memecah string menjadi data array

    return (
        <Scaffold useSafeArea={false} showHeader={false} statusBarColor={'red'} barStyle="light-content" style={styles.page}>
            <View style={styles.container}>
                <Text color="white" size={20} type="semibold">Sha PIN</Text>
                <View style={styles.input}>
                    {pinStrToArr.map((item, index) => <Text key={index.toString()} size={36} color="white" style={{ marginHorizontal: 5 }}>{'*'}</Text>)}
                </View>
                <View style={styles.numpad}>
                    {numpad.map(item => (
                        <Button onPress={() => { addPIN(item.id); Vibration.vibrate(); }} key={item.id} size={22} style={styles.button}>
                            {item.id}
                        </Button>
                    ))}
                    <View style={{ ...styles.button, backgroundColor: "transparent" }} />
                    <Button size={22} style={styles.button} onPress={() => { addPIN('0'); Vibration.vibrate(); }}>
                        0
                    </Button>
                    <TouchableOpacity style={styles.button} onPress={() => { removePIN(); Vibration.vibrate(); }}>
                        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M19 12H5" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                            <Path d="M12 19L5 12L12 5" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                        </Svg>
                    </TouchableOpacity>
                </View>
            </View>
        </Scaffold>
    )
}

export default PIN;

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: 'red',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: StaticColor.backgroundColor4,
        paddingVertical: 36,
        paddingHorizontal: 58,
    },
    input: {
        width: 200,
        height: 45,
        borderBottomWidth: 1,
        borderBottomColor: '#262939',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
        flexDirection: 'row',
    },
    numpad: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginTop: 66
    },
    button: {
        width: 60,
        height: 60,
        backgroundColor: StaticColor.titleColor,
        borderRadius: 60 / 2,
        marginHorizontal: 16,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }
})