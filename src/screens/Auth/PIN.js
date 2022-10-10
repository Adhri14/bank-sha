import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from "react-native-svg";
import { Button, Scaffold, Text } from '../../components';
import StaticColor from "../../utils/Colors";

const PIN = () => {
    const [pin, setPin] = useState('');

    const numpad = [
        { id: '1' },
        { id: '2' },
        { id: '3' },
        { id: '4' },
        { id: '5' },
        { id: '6' },
        { id: '7' },
        { id: '8' },
        { id: '9' },
    ];

    const addPIN = (val) => {
        if (pin.length < 6) {
            let newPIN = pin + val;
            setPin(newPIN);
        }
    }

    const removePIN = () => {
        let newPIN = pin.substring(0, pin.length - 1);
        setPin(newPIN);
    }

    let pinArr = pin.split('');

    return (
        <Scaffold useSafeArea={false} showHeader={false} statusBarColor={StaticColor.backgroundColor4} barStyle="light-content" style={styles.page}>
            <View style={styles.container}>
                <Text color="white" size={20} type="semibold">Sha PIN</Text>
                <View style={styles.input}>
                    {pinArr.map((item, index) => <Text key={index.toString()} size={36} color="white" style={{ letterSpacing: 10 }}>{item === '' ? '' : '*'}</Text>)}
                </View>
                <View style={styles.numpad}>
                    {numpad.map(item => (
                        <Button onPress={() => addPIN(item.id)} key={item.id} size={22} style={styles.button}>
                            {item.id}
                        </Button>
                    ))}
                    <View style={{ ...styles.button, backgroundColor: "transparent" }} />
                    <Button size={22} style={styles.button} onPress={() => addPIN('0')}>
                        0
                    </Button>
                    <TouchableOpacity style={styles.button} onPress={removePIN}>
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
        backgroundColor: StaticColor.backgroundColor4,
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