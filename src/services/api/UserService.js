// @flow

import Api from '.';

const UserService = {
  register: (user) => Api.post('/users', user),
  login: (email, password) => Api.get('/users', { auth: { username: email, password } }),
  update: (user) => Api.patch('/users', user, { auth: { username: user.email, password: user.password } }),
  getUsersFollowed: () => Api.get('/relations'),
  search: (query) => Api.get('/users', { params: { q: query } }),
};

export default UserService;
