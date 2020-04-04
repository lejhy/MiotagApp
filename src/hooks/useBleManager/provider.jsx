// @flow

import React, { createContext } from 'react';
import type { Node } from 'react';

import useBleManager from './hook';

export const BleManagerContext = createContext();

type Props = {
  children: Node,
}

export const BleManagerProvider = ({ children }: Props) => (
  <BleManagerContext.Provider value={useBleManager()}>
    {children}
  </BleManagerContext.Provider>
);
