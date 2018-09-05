// @flow

import { createFixture } from 'react-cosmos';
import AppNavigation from './AppNavigation';
import data from '../tools/data';
import { linksList } from '../tools/links';

const [user] = data.users;

export default linksList.map(([href, name], index) =>
  createFixture({
    component: AppNavigation,
    name: 'route: ' + name,
    props: {
      pathname: href,
      users: data.users,
      selectedUser: user,
      indexedUser: 0,
      addFollower: () => {},
      removeFollower: () => {},
      changeUser(number, fn) {
        fn();
      },
    },
  })
);
