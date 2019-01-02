// @flow

import * as React from 'react';
import styled, { css } from 'styled-components';
import { Transition, Spring } from 'react-spring';

import IconBase from './IconBase';
import IconMail from './IconMail';
import IconMapPin from './IconMapPin';
import IconCalendar from './IconCalendar';
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
  following: boolean,
  saved: boolean,
  showSave: boolean,
};

export default class AppNavTransition extends React.Component<Props, State> {
  state = {
    following: false,
    saved: false,
    showSave: false,
  };

  elements = {};

  changeUser = (i: number) => () => {
    this.props.changeUser(i, () => {
      if (this.props.pathname === '/group') {
        const el = this.elements.profile0;
        el.style.transform = `translate3d(${-70 +
          this.props.indexedUser * 55}px, -70px, 0) scale(0.25)`;
      }
    });
  };

  toggleFollow = () => {
    this.setState(
      state => ({ following: !state.following }),
      () => {
        if (this.state.following) {
          this.props.addFollower();
        } else {
          this.props.removeFollower();
        }
      }
    );
  };

  addPlace = () => {
    if (!this.state.saved && this.props.pathname !== '/') {
      this.setState({ saved: true, showSave: true }, () => {
        setTimeout(() => {
          this.setState({ showSave: false });
        }, 1000);
      });
    } else {
      this.setState({ saved: false, showSave: false });
    }
  };

  render() {
    const { users, selectedUser, pathname } = this.props;
    const { following, saved, showSave } = this.state;

    return (
      <div>
        {users.map((user, i) => (
          <ProfilePhoto
            secondary={user !== selectedUser}
            index={i}
            pathname={pathname}
            onClick={this.changeUser(i)}
            key={user.name}
            innerRef={element => (this.elements[`profile${i}`] = element)}
          >
            <Online pathname={pathname} />
            <Image pathname={pathname} src={user.img} />
          </ProfilePhoto>
        ))}

        <Button
          pathname={pathname}
          onClick={this.toggleFollow}
          isActive={following}
        >
          {following ? <span>&#10004; Following</span> : <span>Follow</span>}
        </Button>

        <ProfileName pathname={pathname}>
          {pathname === '/group' ? (
            <span className="user-trip">{selectedUser.trips[0]}</span>
          ) : (
            <span>{selectedUser.name}</span>
          )}
        </ProfileName>

        <SideIcon onClick={this.addPlace}>
          {pathname === '/' ? (
            <IconBase
              iconName="mail"
              iconColor="#a8dadc"
              width={22}
              height={22}
            >
              <IconMail />
            </IconBase>
          ) : (
            <Spring
              to={{
                svgRotation: saved ? '-360deg' : '0deg',
                line1_scaleX: saved ? 3 : 1,
                line1_x: saved ? 12 : 0,
                line1_rotation: saved ? -50 : 0,
                line2_x: saved ? -3 : 0,
                line2_rotation: saved ? -45 : 0,
              }}
            >
              {styles => (
                <IconBase
                  iconName="plus"
                  iconColor="#a8dadc"
                  style={{ transform: `rotate(${styles.svgRotation})` }}
                >
                  <line
                    style={{
                      transformOrigin: '50% 100%',
                      // prettier-ignore
                      transform: `translateX(${styles.line1_x}px) rotate(${styles.line1_rotation}deg) scaleX(${styles.line1_scaleX})`
                    }}
                    x1="0"
                    x2="24"
                    y1="12"
                    y2="12"
                    stroke="#333"
                    strokeLinecap="round"
                    strokeWidth="3"
                  />
                  <line
                    style={{
                      transformOrigin: '50% 100%',
                      // prettier-ignore
                      transform: `translateX(${styles.line2_x}px) rotate(${styles.line2_rotation}deg)`
                    }}
                    x1="12"
                    x2="12"
                    y1="0"
                    y2="24"
                    stroke="#333"
                    strokeLinecap="round"
                    strokeWidth="3"
                  />
                </IconBase>
              )}
            </Spring>
          )}
        </SideIcon>

        <Transition
          from={{ opacity: 0 }}
          enter={{ opacity: 1 }}
          leave={{ opacity: 0 }}
        >
          {showSave && (styles => <SaveInfo style={styles}>Saved!</SaveInfo>)}
        </Transition>

        <Aside>
          <Transition
            from={{ opacity: 0 }}
            enter={{ opacity: 1 }}
            leave={{ opacity: 0 }}
          >
            {pathname === '/'
              ? () => null
              : pathname === '/group'
              ? styles => (
                  <FloatingMetaNav style={styles}>
                    <IconBase iconName="map pin" iconColor="#a8dadc">
                      <IconMapPin />
                    </IconBase>{' '}
                    France
                  </FloatingMetaNav>
                )
              : styles => (
                  <FloatingMetaNav style={styles}>
                    <IconBase iconName="calendar" iconColor="#a8dadc">
                      <IconCalendar />
                    </IconBase>{' '}
                    {selectedUser.days} days traveling
                  </FloatingMetaNav>
                )}
          </Transition>
        </Aside>
      </div>
    );
  }
}

const groupMixin = (top: string, left: string) => `
  position: absolute;
  top: ${top};
  left: ${left};
  display: block;
  backface-visibility: hidden;
  transform: translateZ(0);
  transition: 0.4s all ease-out;
`;

const onlineMixin = (size: string, position: string, border: string) => `
  position: absolute;
  background: #07dc3c;
  border-radius: 50% 50%;
  width: ${size};
  height: ${size};
  right: ${position};
  bottom: ${position};
  border: ${border};
  opacity: 0;
`;

// prettier-ignore
const Button = styled.button`
  margin-bottom: 10px;
  background: ${props => (props.isActive ? 'rgb(5, 134, 106)' : 'orangered')};
  border: 0;
  cursor: pointer;
  padding: 6px 8px;
  font-size: 16px;
  color: white;
  border-radius: 4px;

  font-weight: bold;
  width: 150px;
  transition: 1s all ease;

  ${groupMixin('320px', '220px')}

  ${props => {
    if (props.pathname === "/place") {
      return `
        transform: translate3d(-215px, -80px, 0);
      `;
    }

    if (props.pathname === "/group") {
      return `
        opacity: 0;
        transition: none;
      `;
    }
  }}

  &:focus {
    outline: 1px dotted rgb(5, 134, 106);
  }
`;

const FloatingMetaNav = styled.p`
  text-align: right;
  position: absolute;
  right: 0;
  top: 250px;
  color: white;
`;

const SaveInfo = styled.div`
  color: white;
  position: absolute;
  top: 194px;
  font-size: 20px;
  right: 56px;
  text-align: right;
  opacity: 0;
`;

const profileTranslations = [
  [-70, -70, 0],
  [-15, -70, 0],
  [40, -70, 0],
  [95, -70, 0],
];

const ProfilePhoto = styled.div`
  width: 200px;
  ${groupMixin('150px', '0')}
  ${({ secondary }) =>
    secondary &&
    `
    opacity: 0;
    transition: none;
  `}
  ${({ pathname, secondary }) => {
    if (!secondary && pathname === '/place') {
      return `
        transform: translate3d(-20px, -100px, 0) scale(0.75);
      `;
    }

    if (!secondary && pathname === '/') {
      return `transform: translate3d(0, 0, 0) scale(1);`;
      /*
      .index .profile-photo.profile-0 {
        transform: translate3d(0, 0, 0) scale(1) !important;
      }
      */
    }

    if (pathname === '/group') {
      return `
        transform: translate3d(-70px, -70px, 0) scale(0.25);
        transition: 0.4s all ease-in-out;
        opacity: 1;
        border-radius: 50% 50%;
        &:hover {
          transition: 0.4s all ease-in-out;
          border: 10px solid white;
        }
      `;
    }
  }}
  ${({ index, secondary }) =>
    secondary &&
    `transform: translate3d(${profileTranslations[index]
      .map(n => `${n}px`)
      .join(', ')}) scale(0.25);
  `}
`;

const Image = styled.img`
  border-radius: 4px;
  transition: 0.4s all ease;
  width: 100%;
  cursor: pointer;
  ${props => props.pathname === '/group' && `border-radius: 50% 50%;`};
`;

const Online = styled.div`
  ${onlineMixin('40px', '10px', '2px solid black')} ${props =>
    props.pathname === '/group' && `opacity: 1;`};
`;

const ProfileName = styled.h2`
  font-size: 35px;
  ${groupMixin('355px', '0')}
  ${({ pathname }) => pathname !== '/' && `color: white;`}
  ${({ pathname }) =>
    pathname === '/place' &&
    `transform: translate3d(140px, -125px, 0) scale(0.75);`}
  ${({ pathname }) =>
    pathname === '/group' && `transform: translate3d(0px, -125px, 0);`}
`;

const SideIcon = styled.div`
  position: absolute;
  top: 220px;
  right: 0;
  display: block;
  transition: 0.4s all ease-out;
  padding: 12px 12px 9px;
  border-radius: 50% 50%;
  cursor: pointer;
  background: ${props =>
    props.pathname !== '/'
      ? `rgba(255, 255, 255, 0.9)`
      : `rgba(255, 255, 255, 0.3)`};
  ${props =>
    props.pathname !== '/' &&
    `
    transform: translate3d(0, -40px, 0);
    @media screen and (max-width: 600px) {
      transform: translate3d(0, -65px, 0);
      padding: 14px 14px 12px;
    }
  `};
`;

const Aside = styled.aside`
  @media screen and (max-width: 600px) {
    display: none;
  }
`;
