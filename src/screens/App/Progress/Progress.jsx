// @flow

import React, { useState, useEffect } from 'react';
import { RefreshControl } from 'react-native';
import styled from 'styled-components';

import useActivities from '@hooks/useActivities';
import { ScreenHeader, Text } from '@core';

import ProgressView from './ProgressView';
import getSummary from './getSummary';

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

const ScrollContainer = styled.ScrollView`
  height: 100%;
`;

export default function Progress() {
  const [refreshing, setRefreshing] = useState(true);
  const [activitiesFromLogs, setActivitiesFromLogs] = useState([]);
  const [{ logs }, { refresh }] = useActivities();

  const refreshLogs = async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  };

  useEffect(() => {
    refreshLogs();
  }, []);

  useEffect(() => {
    if (Array.isArray(logs) && logs.length > 0) {
      const newActivitiesFromLogs = logs.reduce((acc, item) => {
        const existingActivity = acc.find((a) => a.id === item.activity.id);
        if (!existingActivity) return [...acc, item.activity];
        return acc;
      }, []);
      setActivitiesFromLogs(newActivitiesFromLogs);
    }
  }, [logs]);

  return (
    <SafeAreaView>
      <ScreenHeader title="Progress" includeBackButton />
      <ScrollContainer
        refreshControl={(
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refreshLogs}
          />
        )}
      >
        { Array.isArray(activitiesFromLogs) && activitiesFromLogs.length > 0 && (
          <ProgressView
            logs={logs}
            activities={activitiesFromLogs}
          />
        )}
        <Text size="subHeader" align="center">
          Summary
        </Text>
        <Text mr="20px" ml="20px">
          { getSummary(logs) }
        </Text>
      </ScrollContainer>
    </SafeAreaView>
  );
}
