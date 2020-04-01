// @flow

import { useState, useEffect } from 'react';

import UserService from '@services/api/UserService';

import useUser from '../useUser';

export const STORAGE_KEY = 'friends_cache';

export default function useUserSearch(patientsOnly = false) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [{ id }] = useUser();

  const search = async () => {
    const searchResponse = await UserService.search(query);
    setResults(searchResponse.data.filter((u) => (patientsOnly ? u.id !== id && u.therapist === false : u.id !== id)));
  };


  useEffect(() => {
    search();
  }, [query]);


  const methods = {
    setQuery,
  };
  return [{ query, results }, methods];
}
