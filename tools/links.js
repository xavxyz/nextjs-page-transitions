// @flow

// the following works, but is kind of useless in this case,
// as I need a custom "verbose name" for each path
// anyway that was my first time using babel macros,
// this is... d o p e

// import preval from 'babel-plugin-preval/macro';
// const paths: Array<{ pathname: string, name: string }> = preval`
//   const path = require('path');
//   const fs = require('fs');

//   module.exports = fs.readdirSync(path.resolve('./pages'))
//                      .filter(file => !file.includes('_'))
//                      .map(pageFile => pageFile.slice(0,-3))
//                      .map(name => ({
//                         pathname: name === 'index' ? '/' : '/' + name,
//                         name: name,
//                       }));
// `;

type Links = {|
  '/': string,
  '/place': string,
  '/group': string,
|};

const links: Links = {
  '/': 'Home',
  '/place': 'Places',
  '/group': 'Group Trips',
};

// see https://github.com/facebook/flow/issues/2221
export const linksList: Array<any> = Object.entries(links);

export default links;
