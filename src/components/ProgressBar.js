import React, { useState, useEffect, useRef } from 'react';
import { View, Animated, Dimensions } from 'react-native';
import { COLOR_ORANGE, COLOR_WHITE } from '../../../utils';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const ProgressBar = ({ step, steps }) => {
    const [width, setWidth] = useState(0);
    let animatedValue = useRef(new Animated.Value(-1000)).current;
    let reactive = useRef(new Animated.Value(-1000)).current;

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: reactive,
            duration: 1500,
            useNativeDriver: true,
        }).start();
    }, []);

    useEffect(() => {
        reactive.setValue(-width + (width * step) / steps);
    }, [step, width]);

    return (
        <View
            style={{
                width: SCREEN_WIDTH - 22 / 0.24,
                height: 6,
                borderRadius: 6,
                backgroundColor: '#F6F6F6',
                overflow: 'hidden',
            }}>
            <Animated.View
                onLayout={e => {
                    const newWidth = e.nativeEvent.layout.width;
                    setWidth(newWidth);
                }}
                style={{
                    width: '100%',
                    height: 6,
                    borderRadius: 6,
                    backgroundColor: '#22B07D',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    transform: [
                        {
                            translateX: animatedValue,
                        },
                    ],
                }}
            />
        </View>
    );
};

export default ProgressBar;
