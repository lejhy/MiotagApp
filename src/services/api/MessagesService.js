// @flow

import Api from '.';

const RESOURCE_PATH = '/messages';

const MessagesServices = {
  getAll: () => Api.get(RESOURCE_PATH),
  send: () => Api.post(RESOURCE_PATH),
};

export default MessagesServices;
