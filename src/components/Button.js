import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import Styled from 'styled-components';
import StaticColor from '../utils/Colors';

import Text from './Text';

const CustomButton = Styled(TouchableOpacity)`
  backgroundColor: ${props => props.backgroundColor};
  borderColor: ${props => props.borderColor};
  borderWidth: ${props => (props.borderColor ? 2 : 0)}px;
  width: 100%;
  paddingVertical: 10px;
  borderRadius: 5px;
  alignItems: center;
  justifyContent: center;
  flexDirection: row;
`;

const CustomImage = Styled(Image)`
  height: 24px;
  width: 24px;
  position: absolute;
  left: 12px;
  resizeMode: contain;
`;

const defaultProps = {
  transparent: false,
  underline: false,
  outline: false,
  size: 14,
};

const Button = props => {
  const {
    fontColor,
    size,
    color,
    onPress,
    children,
    disabled,
    type,
    source,
    transparent,
    underline,
    outline,
    backgroundColor,
    ...style
  } = props;

  return (
    <CustomButton
      {...style}
      {...props}
      backgroundColor={
        disabled
          ? StaticColor.secondaryColor
          : transparent
          ? 'transparent'
          : outline
          ? props.fontColor || StaticColor.backgroundColor
          : backgroundColor
          ? backgroundColor
          : StaticColor.primaryColor
      }
      borderColor={outline ? color || StaticColor.primaryColor : 'transparent'}
      onPress={!disabled && onPress}>
      {source && <CustomImage source={source} />}
      <Text
        size={size}
        type={type || 'semibold'}
        color={color || 'white'}
        underline={underline}>
        {children}
      </Text>
    </CustomButton>
  );
};

Button.defaultProps = defaultProps;

export default Button;
