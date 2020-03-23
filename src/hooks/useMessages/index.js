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
    let response = null;
    try {
      response = await MessagesService.getAll();
    } catch (err) {
      console.warn(err.response);
      setLoading(false);
      return;
    }
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

  const addMessage = async (message, to) => {
    const newThreads = threads.map((t) => {
      if (t.id === to) {
        return {
          ...t,
          messages: [...t.messages, {
            id: -1,
            body: message,
            isIncoming: false,
            date: new Date(),
          }],
        };
      }
      return t;
    });
    if (userFilter) {
      setThreads(newThreads.filter((t) => t.id === userFilter));
    } else {
      setThreads(newThreads);
    }
    try {
      const response = await MessagesService.send({
        from: { id },
        to: { id: to },
        subject: '(No subject)',
        content: message,
      });
      console.log(response);
      console.log(response.data);
    } catch (err) {
      console.log(err.response);
      console.log(err.response.data);
    }
    await refresh();
  };


  useEffect(() => {
    refresh();
  }, []);

  return [{ threads, loading }, { refresh, addMessage }];
}
