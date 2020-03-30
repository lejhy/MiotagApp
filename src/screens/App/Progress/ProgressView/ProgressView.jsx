// @flow

import React, { useEffect, useState } from 'react';
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
  fontSize: 32,
  borderWidth: 1,
  inputIOS: {
    fontSize: 32,
  },
  inputAndroid: {
    fontSize: 32,
    borderWidth: 1,
    borderColor: 'gray',
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
          date: moment(l.date),
          score: l.score,
          time: Math.round(l.length / 60000),
        }));
      // group by date aggregate into max 7 groups
      let deltaTime = newGraphData[newGraphData.length - 1].date.diff(newGraphData[0].date, 'days');
      let daySpan = Math.ceil(deltaTime/7);
      console.log(daySpan);
      let groupedGraphData = [];
      newGraphData.forEach((d) => {
        if (groupedGraphData.length === 0) {
          groupedGraphData.push(d);
        } else {
          if (d.date.diff(groupedGraphData[groupedGraphData.length - 1].date, 'day') < daySpan) {
            groupedGraphData[groupedGraphData.length - 1].score = Math.max(
              groupedGraphData[groupedGraphData.length - 1].score,
              d.score
            );
            groupedGraphData[groupedGraphData.length - 1].time += d.time;
          } else {
            do {
              groupedGraphData.push({
                date: groupedGraphData[groupedGraphData.length - 1].date.clone().add(daySpan, 'days'),
                score: 0,
                time: 0
              });
            } while(d.date.diff(groupedGraphData[groupedGraphData.length - 1].date, 'day') > daySpan);
            groupedGraphData[groupedGraphData.length - 1].score = d.score;
            groupedGraphData[groupedGraphData.length - 1].time = d.time;
          }
        }
      });
      setGraphData(groupedGraphData);
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
  // set chart size
  const chartSize = Dimensions.get('window').width - 40;

  return (
    <Container>
      { activity && (
        <TopContainer>
          <SelectPicker
            useNativeAndroidPickerStyle={false}
            style={{
              borderWidth: 1,
              borderRadius: 0,
              color: theme.colors.primary,
              iconContainer: {
                top: 8,
                right: 12,
              },
              inputAndroid: {
                height: 48,
                fontSize: 24,
                fontWeight: '700',
                color: 'white',
                borderWidth: 1,
                borderRadius: 8,
                borderColor: theme.colors.primary,
                backgroundColor: theme.colors.primary,
                paddingHorizontal: 10,
                paddingVertical: 0,
              }
            }}
            placeholder={{}}
            onValueChange={onActivityPickerChange}
            items={activityItems}
            value={activity.id}
            Icon={() => {
              return <Icon name="chevron-down" size={32} color={'white'} />;
            }}
          />
        </TopContainer>
      )}
      { graphData.length > 0 && (
        <>
          <Text size="subHeader" align="center" style={{marginTop: 16}}>
            Highest Score
          </Text>
          <LineChart
            width={chartSize}
            data={graphData}
            xField="date"
            yField="score"
          />
          <Text size="subHeader" align="center" style={{marginTop: 12}}>
            Minutes in Activity
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
