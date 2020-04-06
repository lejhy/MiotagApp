// @flow

import axios from 'axios';
import { API_URL } from 'react-native-dotenv';


const FALLBACK_URL = 'http://lejhanec.com:8080';

const api = axios.create({
  baseURL: API_URL || FALLBACK_URL,
});

export default api;
