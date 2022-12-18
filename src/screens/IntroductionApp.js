import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    View,
    StyleSheet,
    useWindowDimensions,
    Image,
    Animated,
    Platform,
    ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { IlOnboarding1, IlOnboarding2, IlOnboarding3 } from '../assets';
import { Scaffold, ScreenIndicator, Text, ToastMessage } from '../components';
import Button from '../components/Button';
import Indicator from '../components/CarouselIndicator';
import { settingAction } from '../reducer/actions/setting';
import { userService } from '../reducer/actions/user';
import { SETTING_APP, SET_SETTING_APP, SET_USER } from '../reducer/key';
import { API_URL } from '../services/config';
import {
    getDataFromLocalStorge,
    removeDataFromLocalStorage,
    saveToLocalStorage,
} from '../storage';
import StaticColor from '../utils/Colors';
import { statusBarHeight } from '../utils/Constants';

const data = [
    {
        key: 0,
        title: 'Grow Your\nFinancial Today',
        description: 'Our system is helping you to\nachieve a better goal',
        image: IlOnboarding1,
    },
    {
        key: 1,
        title: 'Build From\nZero to Freedom',
        description: 'We provide tips for you so that\nyou can adapt easier',
        image: IlOnboarding2,
    },
    {
        key: 2,
        title: 'Start Together',
        description: 'We will guide you to where\nyou wanted it too',
        image: IlOnboarding3,
    },
];

const IntroductionApp = ({ navigation }) => {
    const dispatch = useDispatch();
    const setting = useSelector(state => state.setting);
    const [activeIndex, setActiveIndex] = useState(0);
    const { width, height } = useWindowDimensions();
    const [isLoading, setIsLoading] = useState(false);

    const flatListRef = useRef();

    useEffect(() => {
        if (activeIndex < data.length) {
            goToNext(activeIndex);
        }
    }, [activeIndex]);

    useEffect(() => {
        if (activeIndex < data.length) {
            goToNext(activeIndex);
        }
    }, [activeIndex]);

    useEffect(() => {
        setIsLoading(true);
        if (!setting.app) {
            getDataFromLocalStorge('userProfile').then(res => {
                axios
                    .get(`${API_URL}/users`, {
                        headers: { Authorization: `Bearer ${res?.token}` },
                    })
                    .then(result => {
                        setIsLoading(false);
                        dispatch({
                            type: SET_USER,
                            value: { user: result.data },
                        });
                        redirectTo('MainApp');
                    })
                    .catch(errr => {
                        setIsLoading(false);
                        console.log('error nya : ', errr.response);
                        if (errr.response.status === 401) {
                            removeDataFromLocalStorage(['userProfile']);
                            redirectTo('SignIn');
                        }
                    });
            });
        } else {
            setIsLoading(false);
        }
    }, [setting]);

    const getItemLayout = (data, index) => ({
        length: data.length,
        offset: width * index,
        index,
    });

    const goToNext = index => {
        if (flatListRef.current) {
            if (index === 2) {
                flatListRef.current.scrollToIndex({ animated: true, index });
            } else {
                flatListRef.current.scrollToIndex({ animated: true, index });
            }
        }
    };

    const redirectTo = nav => {
        navigation.reset({
            index: 0,
            routes: [
                {
                    name: nav,
                    merge: true,
                },
            ],
        });
    };

    if (!setting.app) return <ScreenIndicator />;

    return (
        <Scaffold
            showHeader={false}
            useSafeArea
            statusBarColor={StaticColor.backgroundColor}
        >
            <Animated.FlatList
                ref={flatListRef}
                keyExtractor={item => item.key}
                data={data}
                pagingEnabled
                horizontal
                alwaysBounceVertical={false}
                bounces={false}
                // alwaysBounceVertical
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                getItemLayout={getItemLayout}
                initialNumToRender={1}
                initialScrollIndex={activeIndex}
                onMomentumScrollEnd={event => {
                    const roundNumber = Math.round(
                        event.nativeEvent.contentOffset.x / width,
                    );
                    setActiveIndex(roundNumber);
                }}
                // contentContainerStyle={{
                //   height: height,
                // }}
                renderItem={({ item, index }) => {
                    return (
                        <View
                            style={{
                                width,
                                height: '100%',
                                justifyContent: 'space-between',
                                paddingTop: 50,
                                paddingHorizontal: 24,
                            }}
                        >
                            <View
                                style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    // justifyContent: 'ce',
                                }}
                            >
                                <Image
                                    source={item.image}
                                    style={{
                                        width: 270,
                                        height: 330,
                                    }}
                                    // resizeMode="contain"
                                />
                            </View>
                        </View>
                    );
                }}
            />
            <View
                style={{
                    position: 'absolute',
                    bottom: height * 0.01 + statusBarHeight,
                    paddingHorizontal: 64,
                    backgroundColor: 'white',
                    alignSelf: 'center',
                    paddingVertical: 24,
                    paddingHorizontal: 22,
                    width: '85%',
                    marginHorizontal: 24,
                    height: 294,
                    borderRadius: 20,
                }}
            >
                <Text size={20} color={StaticColor.titleColor} type="semibold">
                    {activeIndex === 0
                        ? data[0].title
                        : activeIndex === 1
                        ? data[1].title
                        : data[2].title}
                </Text>
                <Text
                    size={16}
                    color={StaticColor.subtitleColor}
                    type="regular"
                    lineHeight={25}
                    // letterSpacing={1}
                    style={{ marginTop: 16 }}
                >
                    {activeIndex === 0
                        ? data[0].description
                        : activeIndex === 1
                        ? data[1].description
                        : data[2].description}
                </Text>
                <Animated.View
                    style={{
                        flexDirection: activeIndex !== 2 ? 'row' : 'column',
                        alignItems: 'center',
                        justifyContent:
                            activeIndex !== 2 ? 'space-between' : 'center',
                        position: 'absolute',
                        bottom: 24,
                        left: 22,
                        right: 22,
                    }}
                >
                    {activeIndex !== 2 ? (
                        <Indicator
                            currentIndex={activeIndex}
                            count={data.length}
                        />
                    ) : (
                        <Button
                            onPress={() => {
                                saveToLocalStorage(SETTING_APP, false);
                                dispatch({
                                    type: SET_SETTING_APP,
                                    value: false,
                                });
                                redirectTo('SignUp');
                            }}
                            style={{
                                width: activeIndex !== 2 ? 150 : '100%',
                                height: 50,
                                borderRadius: 50,
                                marginBottom: 10,
                            }}
                        >
                            Get Started
                        </Button>
                    )}
                    <Button
                        onPress={() => {
                            if (activeIndex !== 2) {
                                // setTimeout(() => {
                                //   goToNext(2);
                                // }, 500)
                                if (
                                    (Platform.OS === 'ios' &&
                                        !Platform.isPad &&
                                        height === 852) ||
                                    width === 393
                                ) {
                                    // logic untuk type HP iPhone 14 ke atas
                                    if (activeIndex === 0) {
                                        goToNext(1);
                                    } else {
                                        goToNext(2);
                                    }
                                } else {
                                    // selain dari type HP iPhone 14 ke atas
                                    if (activeIndex === 0) {
                                        goToNext(1);
                                        setActiveIndex(1);
                                    } else {
                                        goToNext(2);
                                        setActiveIndex(2);
                                    }
                                }
                            } else {
                                // navigation.replace('SignIn');
                                redirectTo('SignIn');
                                saveToLocalStorage(SETTING_APP, false);
                                dispatch({
                                    type: SET_SETTING_APP,
                                    value: false,
                                });
                            }
                        }}
                        color={
                            activeIndex !== 2
                                ? 'white'
                                : StaticColor.subtitleColor2
                        }
                        style={{
                            width: activeIndex !== 2 ? 150 : '100%',
                            height: 50,
                            borderRadius: 50,
                            backgroundColor:
                                activeIndex !== 2
                                    ? StaticColor.primaryColor
                                    : 'transparent',
                        }}
                    >
                        {activeIndex !== 2 ? 'Continue' : 'Sign In'}
                    </Button>
                </Animated.View>
            </View>
        </Scaffold>
    );
};

export default IntroductionApp;

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: StaticColor.backgroundColor,
    },
});
