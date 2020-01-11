// @flow

import React from 'react';
import styled from 'styled-components';

import useUser from '@hooks/useUser';
import { PRIMARY } from '@styles/colors';
import { Text } from '@core';

import DefaultImage from './default-img.svg';

const Container = styled.View`
  background-color: ${({ theme }) => theme.colors[PRIMARY]};
  flex-direction: row;
`;

const ImageContainer = styled.View`
  height: 75px;
  width: 75px;
  border-radius: 37.5px;
  margin: 10px;
  background-color: #fff;
  justify-content: center;
  align-items: center;
`;

const ContentContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: flex-end;
  padding-right: 10%;
`;

export default function UserInfo() {
  const [, { getFullName }] = useUser();

  return (
    <Container>
      <ImageContainer>
        <DefaultImage width="90%" height="90%" />
      </ImageContainer>
      <ContentContainer>
        <Text color="textInverted" size="large">{ getFullName() }</Text>
      </ContentContainer>
    </Container>
  );
}
