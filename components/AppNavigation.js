import React from 'react';
import Link from 'next/link';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import TweenMax, { Sine } from 'gsap';

import AppMenuDrawer from './AppMenuDrawer';
import AppNavTransition from './AppNavTransition';
import AppStats from './AppStats';
import IconBase from './IconBase';
import IconThreeDot from './IconThreeDot';

const pathnames = [
  { pathname: '/', name: 'index' },
  { pathname: '/place', name: 'place' },
  { pathname: '/group', name: 'group' },
];

class Header extends React.Component {
  state = {
    menuOpened: false,
  };

  toggleMenu = () => {
    this.setState(
      state => ({ menuOpened: !state.menuOpened }),
      () => {
        if (this.state.menuOpened) {
          this.openMenu();
        } else {
          this.closeMenu();
        }
      }
    );
  };

  openMenu() {
    TweenMax.to('.first', 0.2, {
      x: 18,
      ease: Sine.easeOut,
    });
    TweenMax.to('.last', 0.2, {
      x: -18,
      ease: Sine.easeOut,
    });
    TweenMax.staggerTo(
      '.first, .middle, .last',
      0.2,
      {
        fill: '#7eebe6',
        ease: Sine.easeOut,
      },
      0.04
    );
  }

  closeMenu() {
    TweenMax.to('.first', 0.2, {
      x: 0,
      ease: Sine.easeIn,
    });
    TweenMax.to('.last', 0.2, {
      x: 0,
      ease: Sine.easeIn,
    });
    TweenMax.to('.first, .middle, .last', 0.2, {
      fill: '#fff',
    });
  }

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

    const pathPredicate = pathname => p => p.pathname === pathname;

    return (
      <header className={pathnames.find(pathPredicate(pathname)).name}>
        <TransitionGroup className="bk-img">
          <CSSTransition classNames="bk" key={pathname} timeout={400}>
            <div
              className={`header-img${1 +
                pathnames.findIndex(pathPredicate(pathname))}`}
            />
          </CSSTransition>
        </TransitionGroup>

        <div className="nav-wrapper">
          <nav>
            <ul>
              <Link prefetch href="/">
                <li>
                  <a className={pathname === '/' ? 'is-active' : ''}>
                    {firstName(selectedUser.name)}'s Home
                  </a>
                </li>
              </Link>
              <Link prefetch href="/place">
                <li>
                  <a className={pathname === '/place' ? 'is-active' : ''}>
                    {firstName(selectedUser.name)}'s Places
                  </a>
                </li>
              </Link>
              <Link prefetch href="/group">
                <li>
                  <a className={pathname === '/group' ? 'is-active' : ''}>
                    {firstName(selectedUser.name)}'s Group Trips
                  </a>
                </li>
              </Link>
            </ul>
            <div onClick={this.toggleMenu}>
              <IconBase
                className="menu"
                iconName="menu"
                iconColor="white"
                width="28"
                height="28"
              >
                <IconThreeDot />
              </IconBase>
            </div>
            {this.state.menuOpened && (
              <AppMenuDrawer selectedUser={selectedUser} />
            )}
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
          </nav>
        </div>
        <style jsx global>{`
          header {
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
              background: -moz-radial-gradient(
                center,
                ellipse cover,
                rgba(0, 0, 0, 0) 0%,
                rgba(0, 0, 0, 0) 36%,
                rgba(0, 0, 0, 0.65) 100%
              ); /* FF3.6-15 */
              background: -webkit-radial-gradient(
                center,
                ellipse cover,
                rgba(0, 0, 0, 0) 0%,
                rgba(0, 0, 0, 0) 36%,
                rgba(0, 0, 0, 0.65) 100%
              ); /* Chrome10-25,Safari5.1-6 */
              background: radial-gradient(
                ellipse at center,
                rgba(0, 0, 0, 0) 0%,
                rgba(0, 0, 0, 0) 36%,
                rgba(0, 0, 0, 0.65) 100%
              ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
              filter: progid:DXImageTransform.Microsoft.gradient(
                  startColorstr='#00000000',
                  endColorstr='#a6000000',
                  GradientType=1
                ); /* IE6-9 fallback on horizontal gradient */
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
          }

          @mixin header($imgurl) {
            background: url($imgurl) center center;
            background-size: cover;
            position: absolute;
            width: 100vw;
            height: 300px;
          }

          .header-img1 {
            @include header('/static/header1.jpg');
          }

          .header-img2 {
            @include header('/static/header2.jpg');
          }

          .header-img3 {
            @include header('/static/header3.jpg');
          }

          .bk-img {
            position: absolute;
            width: 100vw;
            height: 300px;
            overflow: hidden;
            top: 0;
          }

          .bk-enter,
          .bk-exit {
            opacity: 0;
            transition: all 0.4s ease;
          }

          .bk-exit-active {
            transform: scale(1.1) translateZ(0);
          }

          .bk-enter-active {
            opacity: 1;
          }

          .nav-wrapper {
            width: 100vw;
            position: relative;
            z-index: 1000;
            background: rgba(4, 67, 98, 0.25);
          }

          @media screen and (max-width: 1030px) {
            .nav-wrapper {
              padding: 0 20px;
            }
          }

          ul {
            list-style: none;
            padding: 15px 0;
            li {
              display: inline-block;
              margin-right: 40px;
            }
            a,
            a:active,
            a:visited {
              cursor: pointer;
              color: white;
              text-decoration: none;
            }
          }

          @media screen and (max-width: 600px) {
            ul {
              display: none;
            }
          }

          .is-active {
            font-weight: bold;
          }

          nav {
            max-width: 1000px;
            margin: 0 auto;
            position: relative;
          }

          .menu {
            position: absolute;
            right: 0;
            top: 8px;
            cursor: pointer;
          }
        `}</style>
      </header>
    );
  }
}

const firstName = input => {
  const lastIndex = input.lastIndexOf(' ');
  return input.substring(0, lastIndex);
};

export default Header;
