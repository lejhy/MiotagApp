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

type Activity = {
  id: Number,
  name: String,
}

type Props = {
  logs: Array<Log>,
  activities: Array<Activity>,
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

export default function ProgressView({ logs, activities, theme }: Props) {
  const [activity, setActivity] = useState(activities[0]);
  const [graphData, setGraphData] = useState([{ date: '01/01', score: 0, time: 0 }]);

  useEffect(() => {
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
      <Text size="subHeader" align="center">
        Score
      </Text>
      <LineChart
        width={chartSize}
        data={graphData.map((d) => ({
          date: d.date,
          score: d.score,
        }))}
        xField="date"
        yField="score"
      />
      <Text size="subHeader" align="center">
        Time
      </Text>
      <LineChart
        width={chartSize}
        data={graphData.map((d) => ({
          date: d.date,
          time: d.time,
        }))}
        xField="date"
        yField="time"
      />
    </Container>

  );
}
