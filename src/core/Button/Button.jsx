// @flow

import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled, { css } from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Text from '@core/Text';
import { LARGE } from '@styles/fonts';

const StyledButton = styled.TouchableOpacity`
  min-height: 45px;
`;

const ButtonContainer = styled.View`
  background-color: ${({ theme, variant }) => theme.colors[variant]};
  width: 100%;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  ${(props) => props.css && css`
    ${props.css}
  `};
`;

type Props = {
  children: React.Node,
  variant?: 'primary' | 'secondary',
  icon?: String,
  css?: String,
  textSize?: String,
  loading?: Boolean,
};

export default function Button({
  children, variant, icon, css: cssProp, textSize, loading, ...rest
}: Props) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <StyledButton disabled={loading} {...rest}>
      <ButtonContainer variant={variant} css={cssProp}>
        { loading && (
          // HACK: Should set min heigh
          <>
            <Text
              size={textSize}
              color="textInverted"
              align="center"
              bold
              pt="10px"
              pb="10px"
              ml={icon ? '10px' : '0px'}
            >
              { ' ' }
            </Text>
            <ActivityIndicator color="#fff" />
            <Text
              size={textSize}
              color="textInverted"
              align="center"
              bold
              pt="10px"
              pb="10px"
              ml={icon ? '10px' : '0px'}
            >
              { ' ' }
            </Text>
          </>

        )}
        { icon && !loading && (
          <Icon name={icon} color="#fff" size={24} />
        ) }
        { children && !loading && (
          <Text
            size={textSize}
            color="textInverted"
            align="center"
            bold
            pt="10px"
            pb="10px"
            ml={icon ? '10px' : '0px'}
          >
            { children.toString().toUpperCase() }
          </Text>
        )}
      </ButtonContainer>
    </StyledButton>
  );
}

Button.defaultProps = {
  variant: 'primary',
  icon: null,
  css: null,
  textSize: LARGE,
  loading: false,
};
