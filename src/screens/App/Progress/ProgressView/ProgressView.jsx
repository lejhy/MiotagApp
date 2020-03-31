// @flow

import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import styled from 'styled-components';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome5';
import SelectPicker from 'react-native-picker-select';

import { Text } from '@core';
import ProgressViewItem from './ProgressViewItem';

const Container = styled.View`
  display: flex;
  flex: 1;
  padding: 20px;
`;

export type Log = {
  date: moment,
  length: Number,
  score: Number,
}

type Props = {
  logs: Array<Log>,
  theme: {
    colors: {
      primary: String,
    }
  }
};

const pickerSelectStyles = StyleSheet.create({
  iconContainer: {
    top: 14,
    right: 15,
    elevation: 4,
  },
  inputIOS: {
    height: 52,
    fontSize: 24,
    color: 'black',
    borderRadius: 5,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  inputAndroid: {
    height: 52,
    fontSize: 24,
    color: 'black',
    borderRadius: 5,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  }
});

const buildActivityFilter = (activityId) => (el) => {
  if (activityId) {
    return el.activity.id === activityId;
  }
  return true;
};

export default function ProgressView({ logs, theme }: Props) {
  const [activity, setActivity] = useState(null);
  const [activities, setActivities] = useState([]);
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    if (Array.isArray(logs) && logs.length > 0) {
      const newActivitiesFromLogs = logs.reduce((acc, item) => {
        const existingActivity = acc.find((a) => a.id === item.activity.id);
        if (!existingActivity) return [...acc, item.activity];
        return acc;
      }, []);
      setActivities(newActivitiesFromLogs);
      if (activity === null) {
        setActivity(newActivitiesFromLogs[0]);
      }
    }
  }, [logs]);

  useEffect(() => {
    if (activity !== null) {
      // pick data for graphs
      const newGraphData = logs
        .filter(buildActivityFilter(activity.id))
        .map((l) => ({
          date: moment(l.date),
          score: l.score,
          time: Math.round(l.length / 60000),
        }));
      setGraphData(newGraphData);
    }
  }, [activity]);

  // activities to pick
  const activityItems = activities.map((a) => ({
    label: a.name,
    value: a.id,
  }));

  // handle change
  const onActivityPickerChange = (id) => {
    setActivity(activities.find((a) => a.id === id));
  };

  return (
    <Container>
      { activity && (
        <SelectPicker
          useNativeAndroidPickerStyle={false}
          style={pickerSelectStyles}
          placeholder={{}}
          onValueChange={onActivityPickerChange}
          items={activityItems}
          value={activity.id}
          Icon={() => {
            return <Icon name="chevron-down" size={24} color={theme.colors.primary} />;
          }}
        />
      )}
      { graphData.length > 0 && (
        <>
          <ProgressViewItem
            title="Highest Score"
            graphData={graphData}
            valueKey="score"
          />
          <ProgressViewItem
            title="Minutes Played"
            graphData={graphData}
            valueKey="time"
          />
        </>
      )}
      { Array.isArray(logs) && logs.length === 0 && (
        <Text align="center">
          No recorded activities
        </Text>
      )}
    </Container>

  );
}
