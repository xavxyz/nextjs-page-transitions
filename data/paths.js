// @flow
import preval from 'babel-plugin-preval/macro';

const pathnames: Array<{ pathname: string, name: string }> = preval`
  const path = require('path');
  const fs = require('fs');

  module.exports = fs.readdirSync(path.resolve('./pages'))
                     .filter(file => !file.includes('_'))
                     .map(pageFile => pageFile.slice(0,-3))
                     .map(name => ({
                        pathname: name === 'index' ? '/' : '/' + name,
                        name: name,
                      }));
`;

export default pathnames;
