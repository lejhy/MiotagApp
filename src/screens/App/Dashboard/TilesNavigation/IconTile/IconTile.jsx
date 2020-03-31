// @flow

import React from 'react';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { PRIMARY } from '@styles/colors';
import { SUB_HEADER } from '@styles/fonts';
import { Text } from '@core';

const Tile = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: #fff;
  border-radius: 5px;
  padding: 16px 16px;
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
      <Text pb="2px" size={SUB_HEADER}>{ label }</Text>
      <Icon name={icon} size={48} color={theme.colors[PRIMARY]} />
    </Tile>
  );
}

export type { IconTileProps };
