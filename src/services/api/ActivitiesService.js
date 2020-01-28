// @flow

import Api from '.';

const ActivitiesService = {
  getAll: () => Api.get('/activities'),
  getAllLogs: () => Api.get('/activities/logs'),
  getUserLogs: (id) => Api.get(`activities/${id}/logs`),
};

export default ActivitiesService;
