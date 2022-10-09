import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';
import {View, Image} from 'react-native';

import Text from './Text';
import Button from './Button';
import {Padding} from '../styled';

// import {
//   imageEmpty,
// } from '@assets/images';

const Wrapper = Styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 16px;
  backgroundColor: ${props =>
    props.transparent ? 'transparent' : props.backgroundColor};
`;

const Body = Styled(View)`
  background-color: ${props =>
    props.transparent ? 'transparent' : props.backgroundColor};
  align-items: center;
  justify-content: center;
  padding: 16px;
  border-radius: 5px;
  width: ${props => (props.type === 'small' ? '50%' : '100%')};
`;

const Content = Styled(View)`
`;

const BodyText = Styled(View)`
  width: 100%
  margin-top: 15px;
  justify-content: center;
`;

const propTypes = {
  // children: PropTypes.node.isRequired,
  message: PropTypes.string,
  type: PropTypes.string,
  transparent: PropTypes.bool,
  buttonLabel: PropTypes.string,
  buttonColor: PropTypes.string,
  onButtonPress: PropTypes.func,
};

const defaultProps = {
  message: '',
  type: 'large',
  transparent: false,
  buttonLabel: '',
  buttonColor: '',
  onButtonPress: () => {},
};

const ScreenEmptyData = props => {
  const {message, type, transparent, buttonLabel, buttonColor, onButtonPress} =
    props;

  const {Color} = useColor();

  return (
    <Wrapper transparent={transparent} backgroundColor={Color.theme}>
      <Body type={type} transparent={transparent} backgroundColor={Color.theme}>
        <Content>
          {/* <Image style={{height: 60, aspectRatio: 1}} resizeMode='contain' source={imageEmpty} /> */}
        </Content>

        {message !== '' && (
          <BodyText>
            <Text>{message}</Text>
          </BodyText>
        )}

        {buttonLabel !== '' && (
          <Padding top={16} style={{width: '50%'}}>
            <Button color={buttonColor} onPress={() => onButtonPress()}>
              {buttonLabel}
            </Button>
          </Padding>
        )}
      </Body>
    </Wrapper>
  );
};

ScreenEmptyData.propTypes = propTypes;
ScreenEmptyData.defaultProps = defaultProps;
export default ScreenEmptyData;
