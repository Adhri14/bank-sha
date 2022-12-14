import React from 'react';
import { NativeModules, Platform, Dimensions, StatusBar } from 'react-native';
const { StatusBarManager } = NativeModules;

export const statusBarHeight = isIphoneNotch()
  ? 44
  : StatusBarManager['HEIGHT'];

export function isIphoneNotch() {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 780 ||
      dimen.width === 780 ||
      dimen.height === 812 ||
      dimen.width === 812 ||
      dimen.height === 844 ||
      dimen.width === 844 ||
      dimen.height === 896 ||
      dimen.width === 896 ||
      dimen.height === 926 ||
      dimen.width === 926 || dimen.height === 852 || dimen.width === 393)
  );
}

export const keyExtractor = (item, index) => item.id + index.toString();

// const dataCarousel = [
//     { image: 'https://images.pexels.com/photos/2529159/pexels-photo-2529159.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' },
//     { image: 'https://images.pexels.com/photos/2529146/pexels-photo-2529146.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' },
//     { image: 'https://images.pexels.com/photos/2529158/pexels-photo-2529158.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' },
// ];
