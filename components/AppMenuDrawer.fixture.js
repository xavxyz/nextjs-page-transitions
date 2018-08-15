// @flow

import { createFixture } from 'react-cosmos';
import AppMenuDrawer from './AppMenuDrawer';
import data from '../data';

const [user] = data.users;

export default [
  createFixture({
    component: AppMenuDrawer,
    name: 'opening',
    props: {
      open: true,
      selectedUser: user,
    },
  }),
  createFixture({
    component: AppMenuDrawer,
    name: 'closing',
    props: {
      open: false,
      selectedUser: user,
    },
  }),
];
