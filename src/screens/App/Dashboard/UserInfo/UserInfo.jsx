// @flow

import React from 'react';
import styled from 'styled-components';

import useUser from '@hooks/useUser';
import { PRIMARY } from '@styles/colors';

import DefaultImage from './default-img.svg';

const Container = styled.View`
  height: 75px;
  background-color: ${({ theme }) => theme.colors[PRIMARY]};
  flex-direction: row;
`;

const ImageContainer = styled.View`
  flex: 1;
`;

const ContentContainer = styled.View`
  flex: 9;
`;

const Text = styled.Text``;

export default function UserInfo() {
  const [, { getFullName }] = useUser();

  return (
    <Container>
      <ImageContainer>
        <DefaultImage />
      </ImageContainer>
      <ContentContainer>
        <Text>{ getFullName() }</Text>
      </ContentContainer>
    </Container>
  );
}
