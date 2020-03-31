// @flow

import React, { useEffect } from 'react';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import type { NavigationScreenProps } from 'react-navigation';

import { PRIMARY_LIGHTER, SECONDARY } from '@styles/colors';
import useAlerts from '@hooks/useAlerts';
import { Text } from '@core';

import ScreenHeaderSvg from './screen-header.svg';

const Container = styled.View`
  position: relative;
  width: 100%;
  height: 90px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const SvgContainer = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
`;

const BackButtonWrapper = styled.TouchableOpacity`
  position: absolute;
  top: 6px;
  left: 6px;
  bottom: 0;
`;

const BackButtonInner = styled.View`
  position: relative;
  width: 55px;
  height: 55px;
  border-radius: 27.5px;
  background-color: ${({ theme }) => theme.colors[PRIMARY_LIGHTER]};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AlertsWrapper = styled.TouchableOpacity`
  position: absolute;
  top: 6px;
  right: 6px;
  bottom: 0px;
`;

const AlertsInner = styled.View`
  position: relative;
  width: 55px;
  height: 55px;
  border-radius: 27.5px;
  background-color: ${({ theme }) => theme.colors[PRIMARY_LIGHTER]};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AlertsCountWrapper = styled.View`
  position: absolute;
  right: 1px;
  top: 1%;
  width: 18px;
  height: 18px;
  border-radius: 9px;
  background-color: ${({ theme }) => theme.colors[SECONDARY]};
  display: flex;
  justify-content: center;
  align-items: center;
`;


type Props = {
  title: string,
  navigation: NavigationScreenProps,
  includeBackButton?: Boolean,
  includeAlerts?: Boolean,
};

export default function ScreenHeader({
  title, includeBackButton, includeAlerts, navigation,
}: Props) {
  const handleBackPress = () => navigation.goBack();
  const handleAlertPress = () => navigation.navigate('Notifications');

  const [_, { refresh, count }] = useAlerts();
  useEffect(() => {
    refresh();
  }, []);
  const alertsCount = count();

  return (
    <>
      <Container>
        <SvgContainer>
          <ScreenHeaderSvg width="100%" height="100%" />
        </SvgContainer>
        {
          includeBackButton && (
            <BackButtonWrapper onPress={handleBackPress}>
              <BackButtonInner>
                <Icon name="chevron-left" color="#fff" size={28} />
              </BackButtonInner>
            </BackButtonWrapper>
          )
        }
        <Text size="header" align="center" color="textInverted" bold pb="22px">
          { title }
        </Text>
        {
          includeAlerts && (
            <AlertsWrapper onPress={handleAlertPress}>
              <AlertsInner>
                <Icon name="bell" color="#fff" size={28} />
                { alertsCount !== 0 && (
                  <AlertsCountWrapper>
                    <Text color="#fff" size="12px" bold>
                      { alertsCount }
                    </Text>
                  </AlertsCountWrapper>
                )}
              </AlertsInner>
            </AlertsWrapper>
          )
        }
      </Container>
    </>
  );
}

ScreenHeader.defaultProps = {
  includeBackButton: false,
  includeAlerts: false,
};
