// @flow

import React, { useEffect, useRef } from 'react';
import { useKeepAwake } from 'expo-keep-awake';
import Orientation from 'react-native-orientation-locker';

import useBleManager from '@hooks/useBleManager';
import useUser from '@hooks/useUser';
import usePhoneSensors from '@hooks/usePhoneSensors';

import MiotagLoader from './MiotagLoader';
import PauseContainer from './PauseContainer';

const withMiotag = (staticParams) => (Game) => (props) => {
  const [{ gameDebug }] = useUser();
  const {
    init, getImu, getFingers, getQuaternions, isAvailable,
  } = useBleManager();
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
    if (!gameDebug) {
      init();
    }
  }, []);

  return (
    <MiotagLoader show={!isAvailable && blockView}>
      <PauseContainer
        enabled={includePauseMenu}
        onPause={() => { isPaused.current = true; }}
        onResume={() => { isPaused.current = false; }}
      >
        <Game
          getImu={gameDebug ? getPhoneImu : getImu}
          getFingers={gameDebug ? () => new Uint8Array(5) : getFingers}
          getQuaternions={gameDebug ? () => new Float32Array(4) : getQuaternions}
          isPaused={() => isPaused.current || !isAvailable}
          {...props}
        />
      </PauseContainer>
    </MiotagLoader>
  );
};

export default withMiotag;
