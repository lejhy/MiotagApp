// @flow

import Api from '.';

const UserService = {
  register: (user) => Api.post('/user', user),
  login: (email, password) => Api.get('/user', { auth: { username: email, password } }),
  update: (user) => Api.patch('/user', user, { auth: { username: user.email, password: user.password } }),
  getUsersFollowed: () => Api.get('/relations'),
};

export default UserService;
