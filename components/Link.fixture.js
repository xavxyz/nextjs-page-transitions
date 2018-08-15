// @flow

import { createFixture } from 'react-cosmos';
import Link from './Link';

export default createFixture({
  component: Link,
  props: {
    href: '/',
    children: 'Click Me',
  },
});
