// @flow

import React, { useEffect, useRef } from 'react';
import { useKeepAwake } from 'expo-keep-awake';
import Orientation from 'react-native-orientation-locker';

import useMiotag from '@hooks/useMiotag/hook';
import useUser from '@hooks/useUser';
import usePhoneSensors from '@hooks/usePhoneSensors';

import MiotagLoader from './MiotagLoader';
import PauseContainer from './PauseContainer';

const withMiotag = (staticParams) => (Game) => (props) => {
  const [{ gameDebug }] = useUser();
  const {
    getImu, getFingers, getQuaternions, isAvailable,
  } = useMiotag(!gameDebug);
  const { getPhoneImu } = usePhoneSensors();
  useKeepAwake();
  const isPaused = useRef(false);

  const {
    blockView = true,
    lockToPortrait = false,
    includePauseMenu = true,
  } = staticParams || {};

  useEffect(() => {
    if (lockToPortrait) {
      Orientation.lockToPortrait();
    }
  }, []);

  const GameView = (getImuParam, getFingersParam, getQuaternionsParam) => (
    <PauseContainer
      enabled={includePauseMenu}
      onPause={() => { isPaused.current = true; }}
      onResume={() => { isPaused.current = false; }}
    >
      <Game
        getImu={getImuParam}
        getFingers={getFingersParam}
        getQuaternions={getQuaternionsParam}
        isPaused={() => isPaused.current}
        {...props}
      />
    </PauseContainer>
  );

  if (gameDebug) {
    return GameView(
      getPhoneImu,
      () => new Uint8Array(5),
      () => new Float32Array(4),
    );
  }

  if (!isAvailable && blockView) {
    return (
      <MiotagLoader />
    );
  }

  return GameView(
    getImu,
    getFingers,
    getQuaternions,
  );
};

export default withMiotag;
