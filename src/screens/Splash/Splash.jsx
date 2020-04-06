// @flow

import React, { useEffect } from 'react';
import styled from 'styled-components';
import RNBootSplash from 'react-native-bootsplash';

import useUser from '@hooks/useUser';

const Container = styled.View``;

type Props = {
  navigation: NavigationScreenProps
}


const Splash = ({ navigation }: Props) => {
  const [, { init: initUser }] = useUser();

  const initializeApp = async () => {
    try {
      const user = await initUser();
      if (user && user.firstName && user.lastName) {
        navigation.navigate('Dashboard');
      } else if (user && !user.firstName && !user.lastName) {
        navigation.navigate('ProfileCreation');
      } else {
        navigation.navigate('Auth');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    initializeApp().finally(() => {
      RNBootSplash.hide({ duration: 250 });
    });
  }, []);
  return (
    <Container />
  );
};

export default Splash;
