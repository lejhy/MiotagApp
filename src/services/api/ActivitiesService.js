// @flow

import Api from '.';

const RESOURCE_PATH = '/activities';

const ActivitiesService = {
  getAll: () => Api.get(RESOURCE_PATH),
  getAllLogs: () => Api.get(`${RESOURCE_PATH}/logs`),
  getUserLogs: (id) => Api.get(`${RESOURCE_PATH}/${id}/logs`),
  newLog: (log) => Api.post(`${RESOURCE_PATH}/logs`, log)
};

export default ActivitiesService;
