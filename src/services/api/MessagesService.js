// @flow

import Api from '.';

const RESOURCE_PATH = '/messages';

const MessagesServices = {
  getAll: () => Api.get(RESOURCE_PATH),
  send: (body) => Api.post(RESOURCE_PATH, body),
};

export default MessagesServices;
