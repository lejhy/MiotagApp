// @flow

import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';

import { Button, LineChart, Text } from '@core';
import type { Log } from './ProgressView';
import moment from 'moment';

const GraphContainer = styled.View`
  margin-top: 15px;
  border-radius: 5;
  background-color: #fff;
  shadow-color: #000;
  shadow-offset: 2px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 2;
  elevation: 2;
`;

const GraphHeadingContainer = styled.View`
  padding: 15px 15px 4px 15px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

const buttonStyleOverride = `
  height: 48px;
  width: 48px;
  margin-left: 15px;
`;

type Props = {
  title: string,
  graphData: Array<Log>,
  valueKey: string,
};

moment.updateLocale('en', {
  week: {
    dow: 1,
  },
});

const granularities = [
  'year', 'month', 'week', 'day'
];

export default function ProgressViewItem({ title, graphData, valueKey }: Props) {
  const [zoomGranularityIndex, setZoomGranularityIndex] = useState(2);
  const [zoomedGraphData, setZoomedGraphData] = useState([]);

  // set chart size
  const chartSize = Dimensions.get('window').width - 40;

  useEffect(() => {
    // group by date aggregate into max 7 groups
    let granularity = granularities[zoomGranularityIndex];
    let startTime = moment().startOf(granularity).subtract(6, granularity);
    let groupedGraphData = [{
      date: startTime,
      score: 0,
      time: 0,
    }];
    graphData.forEach((d) => {
      if (d.date.diff(groupedGraphData[groupedGraphData.length - 1].date, granularity) === 0) {
        groupedGraphData[groupedGraphData.length - 1].score = Math.max(
          groupedGraphData[groupedGraphData.length - 1].score,
          d.score
        );
        groupedGraphData[groupedGraphData.length - 1].time += d.time;
      } else if (d.date.diff(groupedGraphData[groupedGraphData.length - 1].date, granularity) > 0) {
        do {
          groupedGraphData.push({
            date: groupedGraphData[groupedGraphData.length - 1].date.clone().add(1, granularity),
            score: 0,
            time: 0
          });
        } while(d.date.diff(groupedGraphData[groupedGraphData.length - 1].date, granularity) > 0);
        groupedGraphData[groupedGraphData.length - 1].score = d.score;
        groupedGraphData[groupedGraphData.length - 1].time = d.time;
      }
    });
    // add missing entries up to current date
    while(groupedGraphData.length < 7) {
      groupedGraphData.push({
        date: groupedGraphData[groupedGraphData.length - 1].date.clone().add(1, granularity),
        score: 0,
        time: 0
      });
    }
    // format the labels
    groupedGraphData = groupedGraphData.map((d) => ({
      date: formatXLabel(d.date),
      score: d.score,
      time: d.time,
    }));
    setZoomedGraphData(groupedGraphData);
  }, [graphData, zoomGranularityIndex]);

  const onZoomOut = () => {
    setZoomGranularityIndex(Math.max(zoomGranularityIndex - 1, 0));
  };

  const onZoomIn = () => {
    setZoomGranularityIndex(Math.min(zoomGranularityIndex + 1, granularities.length - 1));
  };

  const formatXLabel = (l) => {
    switch (zoomGranularityIndex) {
      case 0: return l.format('YYYY');
      case 1: return l.format('MMM');
      default: return l.format('DD/MM');
    }
  };

  return (
    <GraphContainer>
      <GraphHeadingContainer>
        <Text size="subHeader" style={{flexGrow: 1}}>
          { title }
        </Text>
        <Button
          icon="search-minus"
          variant="secondary"
          css={buttonStyleOverride}
          onPress={onZoomOut}
        />
        <Button
          icon="search-plus"
          variant="secondary"
          css={buttonStyleOverride}
          onPress={onZoomIn}
        />
      </GraphHeadingContainer>
      { zoomedGraphData.length > 0 && (
        <LineChart
          width={chartSize}
          data={zoomedGraphData}
          xField="date"
          yField={valueKey}
          formatXLabel={formatXLabel}
        />
      )}
    </GraphContainer>
  )
}
