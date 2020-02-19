// @flow

import React, { useState, useEffect } from 'react';
import { RefreshControl } from 'react-native';
import styled from 'styled-components';

import useActivities from '@hooks/useActivities';
import { ScreenHeader } from '@core';

import ActivityItem from './ActivityItem';

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

const ScrollView = styled.ScrollView`
  flex: 1;
  padding: 5%;
`;

const Text = styled.Text``;

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
      <ScreenHeader title="Activities" includeBackButton />
      <ScrollView
        refreshControl={(
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refreshActivities}
          />
        )}
      >
        { (!activities || activities.length === 0) && (
          <Text align="center">No activities to show</Text>
        ) }
        { (activities && activities.length > 0) && activities.map((a) => (
          <ActivityItem activity={a} key={a.id} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
