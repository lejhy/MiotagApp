// @flow

import React from 'react';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import type { NavigationScreenProps } from 'react-navigation';

import { Text } from '@core';

import ScreenHeaderSvg from './screen-header.svg';

const Container = styled.View`
  position: relative;
  width: 100%;
  height: 75px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const SvgContainer = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
`;

const BackButtonWrapper = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 10%;
  padding-bottom: 10px;
`;


type Props = {
  title: string,
  navigation: NavigationScreenProps,
  includeBackButton?: Boolean,
};

export default function ScreenHeader({ title, includeBackButton, navigation }: Props) {
  const handleBackPress = () => navigation.goBack();

  return (
    <>
      <Container>
        <SvgContainer>
          <ScreenHeaderSvg width="100%" height="100%" />
        </SvgContainer>
        {
          includeBackButton && (
            <BackButtonWrapper onPress={handleBackPress}>
              <Icon name="chevron-left" color="#fff" size={24} />
              <Text size="large" color="textInverted">
                Back
              </Text>
            </BackButtonWrapper>
          )
        }
        <Text size="header" align="center" color="textInverted" bold pb="10px">
          { title }
        </Text>
      </Container>
    </>
  );
}

ScreenHeader.defaultProps = {
  includeBackButton: false,
};
