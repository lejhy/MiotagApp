// @flow

import { useContext } from 'react';

import { UserContext } from './provider';

const useUser = () => useContext(UserContext);
export default useUser;
