// @flow

import Api from '.';

const ActivitiesService = {
  getAll: () => Api.get('/activities'),
  getAllLogs: () => Api.get('/activities/logs'),
};

export default ActivitiesService;
