// @flow

import React, { useState, useEffect } from 'react';
import { SafeAreaView, RefreshControl } from 'react-native';
import styled from 'styled-components';

import useActivities from '@hooks/useActivities';
import { ScreenHeader } from '@core';

import ProgressView from './ProgressView';

const ScrollContainer = styled.ScrollView`
  height: 100%;
  padding: 5%;
`;

export default function Activities() {
  const [refreshing, setRefreshing] = useState(true);
  const [{ activities }, { refresh }] = useActivities();

  const refreshActivities = async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  };

  useEffect(() => {
    refreshActivities();
  }, []);

  return (
    <SafeAreaView>
      <ScreenHeader title="Progress" includeBackButton />
      <ScrollContainer
        refreshControl={(
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refreshActivities}
          />
        )}
      >
        <ProgressView />
      </ScrollContainer>
    </SafeAreaView>
  );
}
