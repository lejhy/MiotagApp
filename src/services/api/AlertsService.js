// @flow

import Api from '.';

const RESOURCE_PATH = '/alerts';

const AlertsService = {
  getAll: () => Api.get(RESOURCE_PATH),
  markAllAsRead: () => Api.post(`${RESOURCE_PATH}/read/all`),
};

export default AlertsService;
