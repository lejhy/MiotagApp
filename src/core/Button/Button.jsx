// @flow

import React from 'react';
import styled, { css } from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Text from '@core/Text';

const StyledButton = styled.TouchableOpacity``;

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
};

export default function Button({
  children, variant, icon, css: cssProp, ...rest
}: Props) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <StyledButton {...rest}>
      <ButtonContainer variant={variant} css={cssProp}>
        { icon && (
          <Icon name={icon} color="#fff" size={24} />
        ) }
        { children && (
          <Text
            size="large"
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
};
