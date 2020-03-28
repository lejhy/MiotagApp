// @flow

import React from 'react';
import styled from 'styled-components';

import IconTile from './IconTile';
import type { IconTileProps } from './IconTile/IconTile';

const Container = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
`;

const TileContainer = styled.View`
  padding: 10px 16px;
  width: 100%;
`;

type Props = {
  items: Array<IconTileProps>,
};

export default function TilesNavigation({ items }: Props) {
  return (
    <Container>
      { items.map((item) => (
        <TileContainer key={item.label}>
          <IconTile
            label={item.label}
            icon={item.icon}
            onPress={item.onPress}
          />
        </TileContainer>
      ))}
    </Container>
  );
}
