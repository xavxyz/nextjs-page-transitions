// @flow
import * as React from 'react';
import { createFixture } from 'react-cosmos';
import preval from 'babel-plugin-preval/macro';
import IconBase from './IconBase';

const iconsFilenames = preval`
  const fs = require('fs');

  module.exports = fs.readdirSync(__dirname).filter(file => file.includes('Icon') && !file.includes('Base'));
`;

export default iconsFilenames.map(filename => {
  // $FlowFixMe
  const Icon = require(`./${filename}`).default;

  const name = filename.slice(4, -3);

  return createFixture({
    component: IconBase,
    name,
    props: {
      iconName: name,
      iconColor: 'orangered',
      children: <Icon />,
      width: 100,
      height: 100,
    },
  });
});
