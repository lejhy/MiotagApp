// @flow

import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import styled from 'styled-components';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome5';
import SelectPicker from 'react-native-picker-select';

import { LineChart, Text } from '@core';

const Container = styled.View`
  display: flex;
  flex: 1;
  padding: 20px;
`;

const TopContainer = styled.View`
  flex-direction: column;
`;

const Dropdown = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
`;

type Log = {
  date: String,
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
  inputIOS: {
    height: 0,
  },
  inputAndroid: {
    height: 0,
  },
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
          date: moment(l.date).format('DD/MM'),
          score: l.score,
          time: l.length,
        }));
        // sort data by date
      graphData.sort((a, b) => a.date - b.date);
      setGraphData(newGraphData);
    }
  }, [activity]);
  // activities to pick
  let activityPicker = null;
  const activityItems = activities.map((a) => ({
    label: a.name,
    value: a.id,
  }));
  // handle change
  const onActivityPickerChange = (id) => {
    setActivity(activities.find((a) => a.id === id));
  };
  // handle toggle
  const togglePicker = () => {
    if (activities.length > 1) {
      activityPicker.togglePicker();
    }
  };
  // set chart size
  const chartSize = Dimensions.get('window').width - 40;

  return (
    <Container>
      { activity && (
        <TopContainer>
          <Text bold size="subHeader">
            Activity:
          </Text>
          <Dropdown onPress={togglePicker}>
            <Text pt="10px" pb="10px" mr="10px">
              { activity.name }
            </Text>
            { activities.length > 1 && (
              <Icon name="chevron-down" color={theme.colors.primary} size={24} />
            )}
          </Dropdown>
          <SelectPicker
            style={pickerSelectStyles}
            onValueChange={onActivityPickerChange}
            items={activityItems}
            value={activity.id}
            ref={(selectPicker) => { activityPicker = selectPicker; }}
          />
        </TopContainer>
      )}
      { graphData.length > 0 && (
        <>
          <Text size="subHeader" align="center">
            Score
          </Text>
          <LineChart
            width={chartSize}
            data={graphData}
            xField="date"
            yField="score"
          />
          <Text size="subHeader" align="center">
            Time
          </Text>
          <LineChart
            width={chartSize}
            data={graphData}
            xField="date"
            yField="time"
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
