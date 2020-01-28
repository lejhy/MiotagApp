// @flow

import Api from '.';

const RESOURCE_PATH = '/users';

const UserService = {
  register: (user) => Api.post(RESOURCE_PATH, user),
  login: (email, password) => Api.get(RESOURCE_PATH, { auth: { username: email, password } }),
  update: (user) => Api.patch(RESOURCE_PATH, user, {
    auth: { username: user.email, password: user.password },
  }),
  getUsersFollowed: () => Api.get('/relations'),
  followUser: (user) => Api.post('/relations', user),
  unfollowUser: (user) => Api.delete('/relations', user),
  search: (query) => Api.get(RESOURCE_PATH, { params: { q: query } }),
  getById: (id) => Api.get(`${RESOURCE_PATH}/${id}`),
};

export default UserService;
