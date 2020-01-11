// @flow

import React, { useState, useEffect } from 'react';
import { SafeAreaView, RefreshControl } from 'react-native';
import styled from 'styled-components';
import type { NavigationScreenProps } from 'react-navigation';

import useActivities from '@hooks/useActivities';
import { ScreenHeader } from '@core';

const ScrollContainer = styled.ScrollView`
  height: 100%;
`;

const Text = styled.Text``;

type Props = {
  navigation: NavigationScreenProps,
};

export default function Activities({ navigation }: Props) {
  const [refreshing, setRefreshing] = useState(true);
  const [activities, { refresh }] = useActivities();

  const refreshActivities = async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  };

  useEffect(() => {
    refreshActivities();
  }, []);

  const handleBackPress = () => navigation.goBack();

  return (
    <SafeAreaView>
      <ScreenHeader title="Activities" onBackPress={handleBackPress} />
      <ScrollContainer
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
          <Text>
            { JSON.stringify(a) }
          </Text>
        ))}
      </ScrollContainer>
    </SafeAreaView>
  );
}
