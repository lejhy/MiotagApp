// @flow

import { useState, useEffect } from 'react';

import UserService from '@services/api/UserService';

export const STORAGE_KEY = 'friends_cache';

export default function useUserSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const search = async () => {
    const searchResponse = await UserService.search(query);
    setResults(searchResponse.data);
  };


  useEffect(() => {
    search();
  }, [query]);


  const methods = {
    setQuery,
  };
  return [{ query, results }, methods];
}
