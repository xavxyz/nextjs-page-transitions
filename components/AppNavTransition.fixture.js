// @flow

import { createFixture } from 'react-cosmos';
import AppNavTransition from './AppNavTransition';
import data from '../data';
import paths from '../data/paths';

const [user] = data.users;

export default paths.map((path, index) =>
  createFixture({
    component: AppNavTransition,
    name: 'route: ' + path.name,
    props: {
      pathname: path.pathname,
      users: data.users,
      selectedUser: user,
      indexedUser: 0,
      addFollower: () => {},
      removeFollower: () => {},
      changeUser(number, fn) {
        fn()
      },
    },
  })
);
