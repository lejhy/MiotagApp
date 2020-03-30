// @flow

import React, { useEffect } from 'react';
import styled from 'styled-components';

import useAlerts from '@hooks/useAlerts';

import NotificationItem from './NotificationItem';

const Container = styled.View`
  padding: 16px;
`;


export default function Notifications() {
  const [alerts, { refresh, markAllAsRead }] = useAlerts();
  const init = async () => {
    await refresh();
    await markAllAsRead();
  };
  useEffect(() => {
    init();
  }, []);

  return (
    <Container>
      { alerts.map((a) => (
        <NotificationItem
          key={a.id}
          message={a.message}
          date={a.date}
        />
      )) }
    </Container>
  );
}
