// @flow

import React from 'react';
import styled from 'styled-components';
import type { NavigationScreenProps } from 'react-navigation';

import { PRIMARY_LIGHT } from '@styles/colors';
import { Button, Text } from '@core';

import ScreenHeaderSvg from './screen-header.svg';

const BackButtonWrapper = styled.View`
  padding: 10px 25%;
  background-color: ${({ theme }) => theme.colors[PRIMARY_LIGHT]};
`;

const Container = styled.View`
  position: relative;
  width: 100%;
  height: 75px;
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

const TextContainer = styled(SvgContainer)`
  display: flex;
  justify-content: center;
  align-items: center;
`;


type Props = {
  title: string,
  includeBackButton?: () => any,
  navigation: NavigationScreenProps,
};

export default function ScreenHeader({ title, includeBackButton, navigation }: Props) {
  const handleBackPress = () => navigation.goBack();

  return (
    <>
      { includeBackButton && (
        <BackButtonWrapper>
          <Button icon="arrow-left" onPress={handleBackPress}>
            Back
          </Button>
        </BackButtonWrapper>
      )}
      <Container>
        <SvgContainer>
          <ScreenHeaderSvg width="100%" height="100%" />
        </SvgContainer>
        <TextContainer>
          <Text size="header" align="center" color="textInverted" bold>
            { title }
          </Text>
        </TextContainer>
      </Container>
    </>
  );
}

ScreenHeader.defaultProps = {
  includeBackButton: false,
};
