import React from 'react';
import IconBase from './IconBase';
import IconMail from './IconMail';
import IconPlus from './IconPlus';
import IconMapPin from './IconMapPin';
import IconCalendar from './IconCalendar';

export default class AppNavTransition extends React.Component {
  state = {
    following: false,
    saved: false,
  };

  elements = {};

  changeUser = i => () => {
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
      this.addAnimation();
      this.setState({ saved: true });
    } else {
      this.removeAnimation();
      this.setState({ saved: false });
    }
  };

  addAnimation() {
    //I love prettier, but it does make this animation code a lot longer and less legible than it could be :/
    const tl = new TimelineMax();

    tl.add('start');
    tl.to(
      '.plus',
      0.75,
      {
        rotation: -360,
        transformOrigin: '50% 50%',
        ease: Expo.easeOut,
      },
      'start'
    );
    tl.to(
      '.line2',
      0.7,
      {
        scaleY: 0.5,
        x: -2,
        rotation: -45,
        transformOrigin: '50% 100%',
        ease: Expo.easeOut,
      },
      'start'
    );
    tl.to(
      '.line1',
      0.7,
      {
        rotation: -50,
        x: 7,
        scaleX: 3,
        transformOrigin: '50% 100%',
        ease: Expo.easeOut,
      },
      'start'
    );
    tl.fromTo(
      '.saveinfo',
      0.5,
      {
        autoAlpha: 0,
      },
      {
        autoAlpha: 1,
        ease: Sine.easeOut,
      },
      'start'
    );
    tl.to(
      '.saveinfo',
      0.4,
      {
        autoAlpha: 0,
        ease: Expo.easeIn,
      },
      'start+=1'
    );

    return tl;
  }

  removeAnimation() {
    const tl = new TimelineMax();

    tl.add('begin');
    tl.to(
      '.plus',
      0.75,
      {
        rotation: 0,
        transformOrigin: '50% 50%',
        ease: Expo.easeOut,
      },
      'begin'
    );
    tl.to(
      '.line2',
      0.7,
      {
        scaleY: 1,
        x: 0,
        rotation: 0,
        transformOrigin: '50% 100%',
        ease: Expo.easeOut,
      },
      'begin'
    );
    tl.to(
      '.line1',
      0.7,
      {
        rotation: 0,
        x: 0,
        scaleX: 1,
        transformOrigin: '50% 100%',
        ease: Back.easeOut,
      },
      'begin'
    );

    tl.timeScale(1.2);

    return tl;
  }

  render() {
    const { users, selectedUser, pathname } = this.props;
    const { following } = this.state;

    return (
      <div className="app-nav-transition">
        {users.map((user, i) => (
          <div
            onClick={this.changeUser(i)}
            key={user.name}
            className={`${
              user === selectedUser
                ? 'profile-photo'
                : 'profile-photo-secondary'
            } profile-${i}`}
            ref={element => (this.elements[`profile${i}`] = element)}
          >
            <div className="online" />
            <img src={user.img} />
          </div>
        ))}

        <button
          onClick={this.toggleFollow}
          className={`${following ? 'active-follow' : ''} follow`}
        >
          {following ? <span>&#10004; Following</span> : <span>Follow</span>}
        </button>

        <h2 key="profile-name" className="profile-name">
          {pathname === '/group' ? (
            <span className="user-trip">{selectedUser.trips[0]}</span>
          ) : (
            <span>{selectedUser.name}</span>
          )}
        </h2>

        <div onClick={this.addPlace} className="side-icon">
          {pathname === '/' ? (
            <IconBase iconName="mail" iconColor="white" width="22" height="22">
              <IconMail />
            </IconBase>
          ) : (
            <IconBase iconName="plus" className="plus" width="18" height="18">
              <IconPlus />
            </IconBase>
          )}
        </div>

        <div key="saveinfo" className="saveinfo">
          Saved!
        </div>

        <aside className="floating-meta-nav">
          <p className="map-pin">
            <IconBase iconName="map pin" width="18" height="18">
              <IconMapPin />
            </IconBase>{' '}
            France
          </p>

          <p className="calendar">
            <IconBase iconName="calendar" width="18" height="18">
              <IconCalendar />
            </IconBase>{' '}
            {selectedUser.days} days traveling
          </p>
        </aside>
        <style jsx global>
          {`
            .floating-meta-nav p {
              text-align: right;
              position: absolute;
              right: 0;
              top: 250px;
              color: white;
            }

            .calendar,
            .map-pin {
              transition: 0.4s all ease-out;
              opacity: 0;
            }

            @mixin group($top, $left) {
              position: absolute;
              top: $top;
              left: $left;
              display: block;
              backface-visibility: hidden;
              transform: translateZ(0);
              transition: 0.4s all ease-out;
            }

            @mixin online($size, $position, $border) {
              position: absolute;
              background: #07dc3c;
              border-radius: 50% 50%;
              width: $size;
              height: $size;
              right: $position;
              bottom: $position;
              border: $border;
              opacity: 0;
            }

            .profile-photo {
              width: 200px;
              @include group(150px, 0);
              img {
                border-radius: 4px;
              }
              .online {
                @include online(40px, 10px, 2px solid black);
              }
            }

            .profile-photo-secondary {
              @include group(150px, 0);
              width: 200px;
              opacity: 0;
              transition: none;
              img {
                border-radius: 50% 50%;
              }
              .online {
                @include online(40px, 0px, 1px solid black);
              }
            }

            .profile-photo,
            .profile-photo-secondary {
              img {
                transition: 0.4s all ease;
                width: 100%;
                cursor: pointer;
              }
            }

            .profile-1 {
              transform: translate3d(-15px, -70px, 0) scale(0.25);
            }
            .profile-2 {
              transform: translate3d(40px, -70px, 0) scale(0.25);
            }
            .profile-3 {
              transform: translate3d(95px, -70px, 0) scale(0.25);
            }

            .follow {
              font-weight: bold;
              width: 150px;
              transition: 1s all ease;
              @include group(320px, 220px);
              &:focus {
                outline: 1px dotted rgb(5, 134, 106);
              }
            }

            .saveinfo {
              color: white;
              position: absolute;
              top: 194px;
              font-size: 20px;
              right: 56px;
              text-align: right;
              visibility: hidden;
              opacity: 0;
            }

            .active-follow {
              background: rgb(5, 134, 106);
            }

            .profile-name {
              font-size: 35px;
              @include group(355px, 0);
            }

            .side-icon {
              position: absolute;
              top: 220px;
              right: 0;
              display: block;
              transition: 0.4s all ease-out;
              padding: 12px 12px 9px;
              background: rgba(255, 255, 255, 0.3);
              border-radius: 50% 50%;
              cursor: pointer;
            }

            //animations
            .place {
              .follow {
                transform: translate3d(-215px, -80px, 0);
              }
              .profile-photo {
                transform: translate3d(-20px, -100px, 0) scale(0.75);
              }
              .profile-name {
                transform: translate3d(140px, -125px, 0) scale(0.75);
                color: white;
              }
              .side-icon {
                transform: translate3d(0, -40px, 0);
                background: rgba(255, 255, 255, 0.9);
              }
              .calendar {
                opacity: 1;
              }
            }

            .group {
              .follow {
                opacity: 0;
                transition: none;
              }
              .profile-photo {
                transform: translate3d(-70px, -70px, 0) scale(0.25);
                img {
                  border-radius: 50% 50%;
                }
              }
              .profile-0,
              .profile-1,
              .profile-2,
              .profile-3 {
                transition: 0.4s all ease-in-out;
                opacity: 1;
              }
              .profile-photo,
              .profile-photo-secondary {
                img:hover {
                  transition: 0.2s all ease;
                  border: 10px solid white;
                }
              }
              .online {
                opacity: 1;
              }
              .profile-name {
                transform: translate3d(0px, -125px, 0);
                color: white;
              }
              .side-icon {
                transform: translate3d(0, -40px, 0);
                background: rgba(255, 255, 255, 0.9);
              }
              .map-pin {
                opacity: 1;
              }
            }

            .index {
              .profile-photo {
                transform: translate3d(0, 0, 0) scale(1);
              }
            }

            .index .profile-photo.profile-0 {
              transform: translate3d(0, 0, 0) scale(1) !important;
            }

            //make the icon aligned with the avatars that are similar on mobile
            @media screen and (max-width: 600px) {
              .group,
              .place {
                .side-icon {
                  transform: translate3d(0, -65px, 0);
                  padding: 14px 14px 12px;
                }
              }
            }

            .items,
            .list-move {
              transition: all 0.4s ease;
            }

            .list-leave-active {
              position: absolute;
            }

            #text {
              transform-origin: 50% 50%;
            }

            svg {
              fill: #a8dadc;
            }

            @media screen and (max-width: 600px) {
              ul,
              aside {
                display: none;
              }
            }
          `}
        </style>
      </div>
    );
  }
}
