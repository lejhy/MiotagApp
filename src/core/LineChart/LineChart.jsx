// @flow

import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';
import { LineChart as LineChartComponent } from 'react-native-chart-kit';

import { SECONDARY_LIGHT, SECONDARY } from '@styles/colors';

const Container = styled.View``;

type Props = {
  data: Array<any>,
  xField: String,
  yField: String,
  theme: {
    colors: {
      [SECONDARY_LIGHT]: String,
    }
  },
  width?: Number,
};

export default function LineChart({
  data, xField, yField, theme, width,
}: Props) {
  return (
    <LineChartComponent
      data={{
        labels: data.map((d) => d[xField]),
        datasets: [{ data: data.map((d) => d[yField]) }],
      }}
      width={width}
      height={180}
      fromZero={true}
      formatXLabel={(l) => l.format('DD/MM')}
      chartConfig={{
        backgroundGradientFrom: theme.colors[SECONDARY_LIGHT],
        backgroundGradientTo: theme.colors[SECONDARY],
        decimalPlaces: 0, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 8,
        },
        propsForDots: {
          r: '6',
          strokeWidth: '2',
          stroke: theme.colors[SECONDARY],
        }
      }}
      bezier
      style={{
        marginVertical: 4,
        borderRadius: 8,
      }}
    />
  );
}

LineChart.defaultProps = {
  width: Dimensions.get('window').width,
};
