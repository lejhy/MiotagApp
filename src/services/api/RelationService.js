// @flow

import Api from '.';

const RESOURCE_PATH = '/relations';

const RelationService = {
  getUsersFollowed: () => Api.get(RESOURCE_PATH),
  followUser: (id) => Api.post(`${RESOURCE_PATH}/${id}`),
  unfollowUser: (id) => Api.delete(`${RESOURCE_PATH}/${id}`),
};

export default RelationService;
