// @flow

import React from 'react';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components';

import { ScreenHeader, Text } from '@core';

type Props = {

};

export default function Messages(props: Props) {
  return (
    <SafeAreaView>
      <ScreenHeader title="Messages" includeBackButton />
      <Text>Messages</Text>
    </SafeAreaView>
  );
}
