// @flow

import React from 'react';
import styled, { css } from 'styled-components';

import { PRIMARY as PRIMARY_FONT, REGULAR as REGULAR_SIZE } from '@styles/fonts';
import { TEXT as TEXT_COLOR } from '@styles/colors';

const StyledText = styled.Text`
  font-family: ${({ theme, font }) => theme.fonts[font] || font || theme.fonts[PRIMARY_FONT]};
  font-size: ${({ theme, size }) => theme.fonts.size[size] || size || theme.fonts.size[REGULAR_SIZE]};
  color: ${({ theme, color }) => theme.colors[color] || color || theme.colors[TEXT_COLOR]};

  ${({ align }) => align && css`
    text-align: ${align};
  `}

  ${({ bold }) => bold !== false && css`
    font-weight: ${bold === true ? 'bold' : bold};
  `}

  ${({ mt }) => mt && css`
    margin-top: ${mt};
  `}

  ${({ mb }) => mb && css`
    margin-bottom: ${mb};
  `}

  ${({ ml }) => ml && css`
    margin-left: ${ml};
  `}

  ${({ mr }) => mr && css`
    margin-right: ${mr};
  `}

  ${({ pt }) => pt && css`
    padding-top: ${pt};
  `}

  ${({ pb }) => pb && css`
    padding-bottom: ${pb};
  `}
`;

type Props = {
  children?: React.Node,
  font?: string,
  size?: string | number,
  color?: string,
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify',
  bold?: boolean | number,
  mt?: string,
  mb?: string,
  ml?: string,
  mr?: string,
  pt?: string,
  pb?: string,
};

export default function Text({ children, ...rest }: Props) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <StyledText {...rest}>
      { children }
    </StyledText>
  );
}

Text.defaultProps = {
  children: null,
  font: null,
  size: null,
  color: null,
  align: null,
  bold: false,
  mt: null,
  mb: null,
  ml: null,
  mr: null,
  pt: null,
  pb: null,
};
