// @flow

import React, { useContext, useState } from 'react';
import { Alert } from 'react-native';
import styled, { ThemeContext } from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { withNavigation } from 'react-navigation';
import type { NavigationScreenProps } from 'react-navigation';

import { PRIMARY } from '@styles/colors';
import { Button } from '@core';

const Container = styled.SafeAreaView`
  position: relative;
  display: flex;
  flex: 1;
  background-color: orange;
`;

const PauseButtonContainer = styled.TouchableOpacity`
  position: absolute;
  height: 60px;
  width: 60px;
  top: 0px;
  right: 0px;
  justify-content: center;
  align-items: center;
`;

const PauseMenuContainer = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0 20%;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
`;

type Props = {
  children: React.Node,
  enabled: Boolean,
  onPause: () => any,
  onResume: () => any,
  navigation: NavigationScreenProps,
};

const BTN_STYLE = { width: '100%', marginBottom: 16 };

function PauseContainer({
  children,
  enabled, onPause, onResume,
  navigation,
}: Props) {
  if (!enabled) {
    return children;
  }

  const theme = useContext(ThemeContext);
  const [paused, setPaused] = useState(false);

  const handlePausePress = () => {
    onPause();
    setPaused(true);
  };

  const handleResumePress = () => {
    onResume();
    setPaused(false);
  };

  const handleQuitPress = () => {
    Alert.alert(
      'Are you sure you want to quit?',
      'Any unsaved progress will be lost',
      [
        { text: 'Cancel' },
        { text: 'OK', onPress: () => navigation.goBack() },
      ],
    );
  };

  return (
    <Container>
      { children }
      { paused && (
        <PauseMenuContainer>
          <Button style={BTN_STYLE} onPress={handleResumePress}>
            Resume
          </Button>
          <Button style={BTN_STYLE} onPress={handleQuitPress}>
            Quit
          </Button>
        </PauseMenuContainer>
      )}
      { !paused && (
        <PauseButtonContainer onPress={handlePausePress}>
          <Icon name="pause" color={theme.colors[PRIMARY]} size={32} />
        </PauseButtonContainer>
      )}
    </Container>
  );
}

export default withNavigation(PauseContainer);
