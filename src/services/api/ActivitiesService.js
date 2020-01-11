// @flow

import Api from '.';

const ActivitiesService = {
  getAll: () => Api.get('/activities'),
};

export default ActivitiesService;
