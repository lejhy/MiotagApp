// @flow

import Api from '.';

const RESOURCE_PATH = '/alerts';

const AlertsService = {
  getAll: () => Api.get(RESOURCE_PATH),
};

export default AlertsService;
