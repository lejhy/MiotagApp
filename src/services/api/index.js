// @flow

import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { API_URL } from 'react-native-dotenv';




import { STORAGE_KEY } from '@hooks/useUser/hook';

const FALLBACK_URL = 'http://lejhanec.com:8080';

const api = axios.create({
  baseURL: API_URL || FALLBACK_URL,
});

export default api;
