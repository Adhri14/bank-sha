import React, { useState, useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import StaticColor from '../utils/Colors';

const Indicator = ({ currentIndex, containerStyle, count }) => {
    const bgAnimatedRef = useRef(new Animated.Value(0)).current;

    const [arrCount, setCount] = useState([]);

    useEffect(() => {
        setCount(new Array(count).fill(0))
    }, [count]);

    useEffect(() => {
        Animated.spring(bgAnimatedRef, {
            toValue: currentIndex * 22,
            velocity: 10,
            useNativeDriver: true,
        }).start();
    }, [currentIndex]);

    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'center',
                ...containerStyle,
            }}
        >
            {arrCount.map((_, idx) => {
                return (
                    <View
                        key={idx}
                        style={{
                            width: 12,
                            height: 12,
                            borderRadius: 12,
                            marginRight: 10,
                            backgroundColor: StaticColor.backgroundColor2,
                        }}
                    />
                )
            })}

            <Animated.View
                style={{
                    width: 12,
                    height: 12,
                    position: 'absolute',
                    left: 0,
                    borderRadius: 12,
                    marginRight: 10,
                    backgroundColor: StaticColor.secondaryColor,
                    transform: [{ translateX: bgAnimatedRef }],
                }}
            />
        </View>
    );
}

export default Indicator;