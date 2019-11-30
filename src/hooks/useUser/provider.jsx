// @flow

import React, { createContext } from 'react';
import type { Node } from 'react';

import useUser from './hook';

export const UserContext = createContext();

type Props = {
  children: Node,
}

export const UserProvider = ({ children }: Props) => (
  <UserContext.Provider value={useUser()}>
    {children}
  </UserContext.Provider>
);
