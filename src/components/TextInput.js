import { StyleSheet, View, TextInput as TextInputRN } from 'react-native';
import React, { forwardRef, useState } from 'react';
import Text from './Text';
import StaticColor from '../utils/Colors';

const TextInput = forwardRef((props, ref) => {
    const { label, styleInput, size, type, ...inputProps } = props;
    const [isFocus, setIsFocus] = useState(false);

    return (
        <View style={{ marginBottom: 16 }}>
            <Text align="left" type={type || 'medium'} size={size}>
                {label}
            </Text>
            <TextInputRN
                ref={ref}
                style={[
                    styles.input,
                    {
                        borderColor: isFocus
                            ? StaticColor.secondaryColor
                            : '#EFEEF1',
                    },
                    styleInput,
                ]}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                underlineColorAndroid="transparent"
                spellCheck={false}
                {...inputProps}
            />
        </View>
    );
});

export default TextInput;

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#EFEEF1',
        borderRadius: 14,
        height: 45,
        marginTop: 8,
        paddingHorizontal: 20,
        fontSize: 14,
        fontFamily: 'Poppins-Medium',
        color: StaticColor.titleColor,
    },
});
