import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  useWindowDimensions,
  Image,
  Animated,
} from 'react-native';
import {IlOnboarding1, IlOnboarding2, IlOnboarding3} from '../assets';
import {Scaffold, Text} from '../components';
import Button from '../components/Button';
import StaticColor from '../utils/Colors';
import {statusBarHeight} from '../utils/Constants';

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

const IntroductionApp = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const {width, height} = useWindowDimensions();

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

  const getItemLayout = (data, index) => ({
    length: data.length,
    offset: width * index,
    index,
  });

  const goToNext = index => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({animated: true, index});
    }
  };

  const isFinished = activeIndex === data.length - 1;

  return (
    <Scaffold
      showHeader={false}
      useSafeArea={false}
      statusBarColor={StaticColor.backgroundColor}>
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
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                width,
                height: '100%',
                justifyContent: 'space-between',
                paddingTop: 50,
                paddingHorizontal: 24,
              }}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  // justifyContent: 'ce',
                }}>
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
        }}>
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
          style={{marginTop: 16}}>
          {activeIndex === 0
            ? data[0].description
            : activeIndex === 1
            ? data[1].description
            : data[2].description}
        </Text>
        <View
          style={{
            flexDirection: activeIndex !== 2 ? 'row' : 'column',
            alignItems: 'center',
            justifyContent: activeIndex !== 2 ? 'space-between' : 'center',
            position: 'absolute',
            bottom: 24,
            left: 22,
            right: 22,
          }}>
          {activeIndex !== 2 ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              {data.map((item, index) => (
                <View
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 12 / 2,
                    backgroundColor:
                      activeIndex === index
                        ? StaticColor.secondaryColor
                        : StaticColor.backgroundColor2,
                    marginRight: 10,
                  }}
                />
              ))}
            </View>
          ) : (
            <Button
              onPress={() => console.warn('Sign Up')}
              style={{
                width: activeIndex !== 2 ? 150 : '100%',
                height: 50,
                borderRadius: 50,
                marginBottom: 10,
              }}>
              Get Started
            </Button>
          )}
          <Button
            onPress={() => {
              if (activeIndex !== 2) {
                goToNext(2);
              } else {
                console.warn('Sign In');
              }
            }}
            color={activeIndex !== 2 ? 'white' : StaticColor.subtitleColor2}
            style={{
              width: activeIndex !== 2 ? 150 : '100%',
              height: 50,
              borderRadius: 50,
              backgroundColor:
                activeIndex !== 2 ? StaticColor.primaryColor : 'transparent',
            }}>
            {activeIndex !== 2 ? 'Continue' : 'Sign In'}
          </Button>
        </View>
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
