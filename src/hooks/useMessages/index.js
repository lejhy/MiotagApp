// @flow

import { useState, useEffect } from 'react';

import MessagesService from '@services/api/MessagesService';
import useUser from '../useUser';

type Message = {
  id: Number,
  body: String,
  isIncoming: Boolean,
  date: Date,
};

type Thread = {
  name: String,
  id: Number,
  messages: Array<Message>,
}

export type { Message, Thread };

export default function useMessages(userFilter) {
  const [threads: Array<Thread>, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [{ id }] = useUser();

  const refresh = async () => {
    setLoading(true);
    const response = await MessagesService.getAll();
    const messages = response.data;
    const newThreads = Object.values(messages.reduce((acc, msg) => {
      const user = msg.to.id === id ? msg.from : msg.to;
      const message = {
        id: msg.id,
        body: msg.content,
        isIncoming: msg.to.id === id,
        date: msg.date,
      };
      if (acc[user.id]) {
        return {
          ...acc,
          [user.id]: {
            name: `${user.firstName} ${user.lastName}`,
            id: user.id,
            messages: [...acc[user.id].messages, message],
          },
        };
      }
      return {
        ...acc,
        [user.id]: {
          name: `${user.firstName} ${user.lastName}`,
          id: user.id,
          messages: [message],
        },
      };
    }, {}));
    if (userFilter) {
      setThreads(newThreads.filter((t) => t.id === userFilter));
    } else {
      setThreads(newThreads);
    }
    setLoading(false);
  };


  useEffect(() => {
    refresh();
  }, []);

  return [{ threads, loading }, { refresh }];
}
