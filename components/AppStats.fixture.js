// @flow

import { createFixture } from 'react-cosmos';
import AppStats from './AppStats';
import data from '../data';

export default data.users.map(user =>
  createFixture({
    component: AppStats,
    name: user.name,
    props: {
      selectedUser: user,
    },
  })
);
