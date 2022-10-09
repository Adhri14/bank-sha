import React from 'react';
import Styled from 'styled-components';
import {View, ActivityIndicator, Platform} from 'react-native';

import Text from './Text';
import StaticColor from '../utils/Colors';

const Wrapper = Styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;

const Body = Styled(View)`
  backgroundColor: ${props =>
    props.transparent ? 'transparent' : props.backgroundColor};
  align-items: center;
  justify-content: center;
  padding: 16px;
  border-radius: 5px;
  width: ${props => (props.type === 'small' ? '50%' : '100%')};
`;

const Content = Styled(View)`
  borderWidth: ${Platform.OS === 'android' ? '5px' : '0px'};
  borderRadius: 25px;
  height: 50px;
  width: 50px;
  justifyContent: center;
  alignItems: center;
`;

const BodyText = Styled(View)`
  width: 100%
  margin-top: 15px;
  justify-content: center;
`;

const defaultProps = {
  visible: true,
  message: 'Mohon Tunggu',
  type: 'large',
  transparent: false,
};

const ScreenIndicator = props => {
  const {visible, message, type, transparent} = props;

  if (!visible) {
    return <View />;
  }

  return (
    <Wrapper>
      <Body
        type={type}
        transparent={transparent}
        backgroundColor={StaticColor.backgroundColor}>
        <Content style={{borderColor: StaticColor.backgroundColor}}>
          <ActivityIndicator
            size={Platform.OS === 'android' ? 60 : type}
            color={StaticColor.primaryColor}
            style={{position: 'absolute'}}
          />
        </Content>
        {message && (
          <BodyText>
            <Text color={StaticColor.primaryColor}>{message}</Text>
          </BodyText>
        )}
      </Body>
    </Wrapper>
  );
};

ScreenIndicator.defaultProps = defaultProps;
export default ScreenIndicator;
