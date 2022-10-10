import React from 'react';
import { Text as ReactText } from 'react-native';
import Styled from 'styled-components';
import StaticColor from '../utils/Colors';

const fontFamily = {
  thin: '',
  extralight: '',
  light: 'Poppins-Light',
  regular: 'Poppins-Regular',
  medium: 'Poppins-Medium',
  semibold: 'Poppins-SemiBold',
  bold: 'Poppins-Bold',
  extrabold: 'Poppins-ExtraBold',
  black: '',
  italic: 'Poppins-Italic',
};

const BaseText = Styled(ReactText)`
  fontFamily: ${props => fontFamily[props.type] || fontFamily.regular};
  fontSize: ${props => props.size || '14'}px;
  textAlign: ${props => props.align || 'center'};
  color: ${props => props.color};
  textShadowRadius: 0;
  ${props => props.lineHeight && `lineHeight: ${props.lineHeight}px`}
`;

const Text = props => {
  const {
    type,
    align,
    children,
    size,
    lineHeight,
    letterSpacing,
    color,
    underline,
    lineThrough,
    onPress,
    ...style
  } = props;

  return (
    <BaseText
      onPress={onPress}
      style={[
        letterSpacing && { letterSpacing },
        underline && { textDecorationLine: 'underline' },
        lineThrough && { textDecorationLine: 'line-through' },
        { includeFontPadding: false },
      ]}
      {...style}
      align={align}
      type={type}
      size={size}
      lineHeight={lineHeight}
      allowFontScaling={false}
      color={color || StaticColor.titleColor}>
      {children}
    </BaseText>
  );
};

export default Text;
