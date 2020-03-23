// @flow

import React from 'react';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { GRAY, PRIMARY } from '@styles/colors';
import { SUB_HEADER } from '@styles/fonts';
import { Text } from '@core';

const Tile = styled.TouchableOpacity`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #fff;
  border-radius: 5px;
  padding: 20px 0;
  shadow-color: #000;
  shadow-offset: 2px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 2px;
  elevation: 2;
`;

type IconTileProps = {
  label: String,
  icon: String,
  onPress: () => void,
  theme: {
    colors: any
  }
};

export default function IconTile({
  label, icon, onPress, theme,
}: IconTileProps) {
  return (
    <Tile onPress={onPress}>
      <Icon name={icon} size={80} color={theme.colors[PRIMARY]} />
      <Text pt="20px" bold size={SUB_HEADER}>{ label }</Text>
    </Tile>
  );
}

export type { IconTileProps };
