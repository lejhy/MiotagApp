// @flow

import Api from '.';

const UserService = {
  register: (user) => Api.post('/user', user),
  login: (email, password) => Api.get('/user', { auth: { username: email, password } }),
};

export default UserService;
