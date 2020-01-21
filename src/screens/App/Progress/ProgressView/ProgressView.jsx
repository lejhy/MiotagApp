// @flow

import React from 'react';
import styled from 'styled-components';
import {
  YAxis, AreaChart, Grid, XAxis,
} from 'react-native-svg-charts';
import * as shape from 'd3-shape';

const Container = styled.View`
  flex-direction: row;
  height: 200px;
`;

const Inner = styled.View`
  flex: 1;
  margin-left: 16px;
`;

const Text = styled.Text``;

type Props = {

};

export default function ProgressView(props: Props) {
  const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80];
  const contentInset = { top: 20, bottom: 20 };

  return (
    <Container>
      <YAxis
        data={data}
        contentInset={contentInset}
        svg={{
          fill: 'grey',
          fontSize: 10,
        }}
        numberOfTicks={10}
        formatLabel={(value) => `${value}ºC`}
      />
      <Inner>
        <AreaChart
          style={{ flex: 1 }}
          data={data}
          contentInset={contentInset}
          curve={shape.curveNatural}
          svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
          animate
        >
          <Grid />
        </AreaChart>
        <XAxis
          data={data}
          formatLabel={(value, index) => index}
          contentInset={{ left: 10, right: 10 }}
          svg={{ fontSize: 10, fill: 'black' }}
        />
      </Inner>
    </Container>
  );
}
