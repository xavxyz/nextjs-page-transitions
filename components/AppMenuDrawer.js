// @flow

import * as React from 'react';
import styled from 'styled-components';
import { Spring, Trail } from 'react-spring';
import Link from './Link';
import { linksList } from '../tools/links';
import firstName from '../tools/firstName';
import type { User } from '../tools/types';

type Props = {
  open: boolean,
  selectedUser: User,
};

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
              keys={linksList.map(([href]) => href)}
              delay={100}
            >
              {linksList.map(([href, name]) => styles => (
                <div style={styles}>
                  <Link href={href} color="white">
                    {firstName(selectedUser.name)}
                    's {name}
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
