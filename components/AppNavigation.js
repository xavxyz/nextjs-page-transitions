// @flow
import * as React from 'react';
import { Transition, Trail, Spring } from 'react-spring';
import styled from 'styled-components';
import TweenMax, { Sine } from 'gsap';

import AppMenuDrawer from './AppMenuDrawer';
import AppNavTransition from './AppNavTransition';
import AppStats from './AppStats';
import IconBase from './IconBase';
import Link from './Link';
import links, { linksList } from '../tools/links';
import firstName from '../tools/firstName';
import type { User } from '../tools/types';

type Props = {
  users: Array<User>,
  selectedUser: User,
  indexedUser: number,
  pathname: string,
  addFollower: () => void,
  removeFollower: () => void,
  changeUser: (number, () => void) => void,
};

type State = {
  isMenuOpened: boolean,
};

export default class AppNavigation extends React.Component<Props, State> {
  state = {
    isMenuOpened: false,
  };

  toggleMenu = () => {
    this.setState(state => ({ isMenuOpened: !state.isMenuOpened }));
  };

  render() {
    const {
      selectedUser,
      indexedUser,
      users,
      addFollower,
      removeFollower,
      changeUser,
      pathname,
    } = this.props;
    const { isMenuOpened } = this.state;
    const index = 1 + linksList.findIndex(([href]) => href === pathname);

    return (
      <Header className={links[pathname]}>
        <BackgroundOverflowControl>
          <Transition
            from={{ opacity: 0 }}
            enter={{ opacity: 1 }}
            leave={{ opacity: 0, transform: 'scale(1.1) translateZ(0)' }}
            keys={index}
          >
            {styles => <Background style={styles} imageIndex={index} />}
          </Transition>
        </BackgroundOverflowControl>
        <Wrapper>
          <Nav>
            <List>
              {linksList.map(([href, name]) => (
                <Item key={href}>
                  <Link href={href} active={href === pathname} color="#fff">
                    {firstName(selectedUser.name)}
                    's {name}
                  </Link>
                </Item>
              ))}
            </List>
            <Menu onClick={this.toggleMenu}>
              <IconBase iconName="menu" iconColor="#fff" width={28} height={28}>
                {/* lol, nested declarative fun */}
                <Trail
                  from={{ fill: '#fff' }}
                  to={{ fill: isMenuOpened ? '#7eebe6' : '#fff' }}
                  keys={['first', 'middle', 'last']}
                >
                  {({ fill }) => (
                    <Spring from={{ cx: 3 }} to={{ cx: isMenuOpened ? 21 : 3 }}>
                      {({ cx }) => <circle fill={fill} cx={cx} cy={12} r="3" />}
                    </Spring>
                  )}
                  {({ fill }) => <circle fill={fill} cx={12} cy={12} r="3" />}
                  {({ fill }) => (
                    <Spring
                      from={{ cx: 21 }}
                      to={{ cx: isMenuOpened ? 3 : 21 }}
                    >
                      {({ cx }) => <circle fill={fill} cx={cx} cy={12} r="3" />}
                    </Spring>
                  )}
                </Trail>
              </IconBase>
            </Menu>
            <AppMenuDrawer selectedUser={selectedUser} open={isMenuOpened} />
            <AppNavTransition
              selectedUser={selectedUser}
              indexedUser={indexedUser}
              users={users}
              addFollower={addFollower}
              removeFollower={removeFollower}
              changeUser={changeUser}
              pathname={pathname}
            />
            {pathname === '/' && <AppStats selectedUser={selectedUser} />}
          </Nav>
        </Wrapper>
      </Header>
    );
  }
}

const Header = styled.header`
  width: 100vw;
  height: 300px;
  position: relative;

  &:before {
    content: '';
    z-index: 10;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: radial-gradient(
      ellipse at center,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) 36%,
      rgba(0, 0, 0, 0.65) 100%
    );
    filter: progid:DXImageTransform.Microsoft.gradient(
        startColorstr='#00000000',
        endColorstr='#a6000000',
        GradientType=1
      );
    opacity: 0.6;
  }
  &:after {
    content: '';
    position: absolute;
    z-index: -1;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: #000;
  }
`;

const BackgroundOverflowControl = styled.div`
  position: absolute;
  width: 100vw;
  height: 300px;
  overflow: hidden;
  top: 0;
`;

const Background = styled.div`
  background: url('/static/header${props =>
    props.imageIndex}.jpg') center center;
  background-size: cover;
  width: 100vw;
  height: 300px;
  position: absolute;
  top: 0;
`;

const Wrapper = styled.div`
  width: 100vw;
  position: relative;
  z-index: 1000;
  background: rgba(4, 67, 98, 0.25);

  @media screen and (max-width: 1030px) {
    padding: 0 20px;
  }
`;

const Nav = styled.nav`
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
`;

const List = styled.ul`
  list-style: none;
  padding: 15px 0;

  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const Item = styled.li`
  display: inline-block;
  margin-right: 40px;
`;

const Menu = styled.div`
  position: absolute;
  right: 0;
  top: 8px;
  cursor: pointer;
`;
