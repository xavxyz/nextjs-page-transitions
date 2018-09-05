// @flow
import { createFixture } from 'react-cosmos';
import Places from './Places';
import data from '../tools/data';

export default createFixture({
  component: Places,
  props: {
    places: data.places,
  },
});
