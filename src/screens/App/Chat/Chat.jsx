// @flow

import React from 'react';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components';

import { ScreenHeader, Text } from '@core';

type Props = {

};

export default function Chat(props: Props) {
  return (
    <SafeAreaView>
      <ScreenHeader title="Chat" includeBackButton />
      <Text>Chat</Text>
    </SafeAreaView>
  );
}
