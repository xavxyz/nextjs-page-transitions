// @flow

import * as React from 'react';
import Link from './Link';
import styled from 'styled-components';
import { Spring, Trail } from 'react-spring';
import type { User } from '../data/types';

type Props = {
  open: boolean,
  selectedUser: User,
};

const links = [
  { href: '/', name: 'Home' },
  { href: '/place', name: 'Places' },
  { href: '/group', name: 'Group Trips' },
];

export default class AppMenuDrawer extends React.Component<Props> {
  render() {
    const { open, selectedUser } = this.props;
    return (
      <Spring
        from={{ opacity: Number(!open), scale: Number(!open) }}
        to={{ opacity: Number(open), scale: Number(open) }}
      >
        {style => (
          <Drawer
            style={{
              opacity: style.opacity,
              transform: `scale(${style.scale})`,
            }}
          >
            <Trail
              from={{ opacity: 0 }}
              to={{ opacity: 1 }}
              keys={links.map(link => link.name)}
              delay={100}
            >
              {links.map(link => styles => (
                <div style={styles}>
                  <Link href={link.href} color="white">
                    {firstName(selectedUser.name)}
                    's {link.name}
                  </Link>
                </div>
              ))}
            </Trail>
          </Drawer>
        )}
      </Spring>
    );
  }
}

function firstName(input: string): string {
  const lastIndex = input.lastIndexOf(' ');
  return input.substring(0, lastIndex);
}

const Drawer = styled.div`
  transform-origin: 100% 0%;
  background: rgba(0, 0, 0, 0.8);
  line-height: 1.8;
  text-align: right;
  position: absolute;
  right: 0px;
  top: 45px;
  padding: 20px;
  border-radius: 4px;
  z-index: 10000; /* lol */

  > *:not(:last-child) {
    margin-bottom: 6px;
  }
`;
