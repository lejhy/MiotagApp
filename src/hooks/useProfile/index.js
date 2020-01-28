// @flow

import { useState, useEffect } from 'react';

import UserService from '@services/api/UserService';
import ActivitiesService from '@services/api/ActivitiesService';

import useFriends from '../useFriends';

export const STORAGE_KEY = 'activities_cache';

export default function useProfile(id: Number) {
  const [logs, setLogs] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFriend, setFriend] = useState(undefined);
  const [friends, { refresh: refreshFriends }] = useFriends();

  const init = async () => {
    const userResponse = await UserService.getById(id);
    const logsResponse = await ActivitiesService.getUserLogs(id);
    setUser(userResponse.data);
    setLogs(logsResponse.data);
    await refreshFriends();
    setLoading(false);
  };

  const toggleFriend = async () => {
    const method = isFriend
      ? UserService.unfollowUser(user)
      : UserService.followUser(user);

    setFriend(undefined);
    await method;
    await refreshFriends();
  };

  useEffect(() => {
    setFriend(friends.some((f) => f.id === id));
  }, [friends]);

  useEffect(() => {
    init();
  }, []);


  return [{
    logs,
    user,
    loading,
    isFriend,
  }, {
    init,
    toggleFriend,
  }];
}
