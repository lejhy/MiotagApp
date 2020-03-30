// @flow

import React, { createContext } from 'react';
import type { Node } from 'react';

import useAlert from './hook';

export const AlertsContext = createContext();

type Props = {
  children: Node,
}

export const AlertsProvider = ({ children }: Props) => (
  <AlertsContext.Provider value={useAlert()}>
    {children}
  </AlertsContext.Provider>
);
