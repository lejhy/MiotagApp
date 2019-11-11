// @flow

import React from 'react';
import styled from 'styled-components';

import Text from '@core/Text';

const StyledButton = styled.TouchableOpacity``;

const ButtonContainer = styled.View`
  background-color: ${({ theme, variant }) => theme.colors[variant]};
  width: 100%;
  border-radius: 5px;
`;

type Props = {
  children: React.Node,
  variant?: 'primary' | 'secondary',
};

export default function Button({ children, variant, ...rest }: Props) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <StyledButton {...rest}>
      <ButtonContainer variant={variant}>
        <Text
          size="large"
          color="textInverted"
          align="center"
          bold
          pt="10px"
          pb="10px"
        >
          { children.toString().toUpperCase() }
        </Text>
      </ButtonContainer>
    </StyledButton>
  );
}

Button.defaultProps = {
  variant: 'primary',
};
