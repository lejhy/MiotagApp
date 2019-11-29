// @flow

import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

import { Text } from '@core';

import ScreenHeaderSvg from './screen-header.svg';

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
};

export default function ScreenHeader({ title }: Props) {
  return (
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
  );
}
