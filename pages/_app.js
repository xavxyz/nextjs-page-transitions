import App, { Container } from 'next/app';
import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import AppNavigation from '../components/AppNavigation';
import AppFooter from '../components/AppFooter';
import data from '../data';

export default class MyApp extends App {
  state = {
    indexedUser: 0,
    ...data,
  };

  addFollower = () => {
    this.setState(state => ({
      users: [
        ...state.users.slice(0, state.indexedUser),
        {
          ...state.users[state.indexedUser],
          followers: state.users[state.indexedUser].followers + 1,
        },
        ...state.users.slice(state.indexedUser + 1),
      ],
    }));
  };

  removeFollower = () => {
    this.setState(state => ({
      users: [
        ...state.users.slice(0, state.indexedUser),
        {
          ...state.users[state.indexedUser],
          followers: state.users[state.indexedUser].followers - 1,
        },
        ...state.users.slice(state.indexedUser + 1),
      ],
    }));
  };

  changeUser = (index, cb) => {
    this.setState(() => ({ indexedUser: index }), cb);
  };

  render() {
    const { Component, pageProps } = this.props;
    const selectedUser = this.state.users[this.state.indexedUser];

    return (
      <Container>
        <div>
          <AppNavigation
            {...this.state}
            selectedUser={selectedUser}
            addFollower={this.addFollower}
            removeFollower={this.removeFollower}
            changeUser={this.changeUser}
            pathname={this.props.router.pathname}
          />
          <TransitionGroup className="transition-group-wrapper">
            <CSSTransition
              classNames="page"
              key={this.props.router.pathname}
              timeout={250}
            >
              <Component
                {...pageProps}
                {...this.state}
                selectedUser={selectedUser}
              />
            </CSSTransition>
          </TransitionGroup>
          <AppFooter />
        </div>
        <style jsx global>{`
          /* common styles shared through the application */

          body {
            background: white;
            color: #333;
            font-family: 'Josefin Sans', serif;
            font-size: 16px;
            word-spacing: 1px;
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%;
            -moz-osx-font-smoothing: grayscale;
            -webkit-font-smoothing: antialiased;
            box-sizing: border-box;
            line-height: 1.2;
            overflow-x: hidden;
          }

          *,
          *:before,
          *:after {
            box-sizing: border-box;
            margin: 0;
          }

          a,
          a:visited,
          a:active {
            color: orangered;
            text-decoration: none;
          }

          button {
            margin-bottom: 10px;
            background: orangered;
            border: 0;
            cursor: pointer;
            padding: 6px 8px;
            font-size: 16px;
            color: white;
            border-radius: 4px;
          }

          h1,
          h2,
          h3,
          h4 {
            font-family: 'Playfair Display', serif;
            font-weight: normal;
          }

          main {
            max-width: 1000px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
          }

          .top {
            text-transform: uppercase;
            font-size: 14px;
            color: #666;
            padding: 0;
            margin: 30px 0 0;
          }

          .places {
            width: 60%;
          }

          aside.sidebar {
            width: 35%;
            padding: 20px;
            margin: 40px 0 0 20px;
            background: #eee;
            float: right;
          }

          hr {
            border-top: 1px solid #ccc;
            border-bottom: none;
            margin-top: 15px;
          }

          @media screen and (max-width: 1030px) {
            main {
              padding: 0 20px;
            }
          }

          @media screen and (max-width: 600px) {
            main {
              flex-direction: column;
            }
            .places {
              width: 100%;
            }
            aside.sidebar {
              width: 100%;
              margin: 10px 0;
            }
          }

          .transition-group-wrapper {
            position: relative; /* xavier's dirty hack */
          }

          .page-enter,
          .page-exit {
            opacity: 0;
            transition: all 0.25s ease;
          }

          .page-enter-active,
          .page-exit-active {
            transition: all 0.25s ease;
            transform: translateZ(0);
            backface-visibility: hidden;
          }

          .page-enter-active {
            opacity: 1;
            position: absolute; /* xavier's dirty hack */
          }

          /* screen reader only */
          .hidden {
            position: absolute;
            left: -10000px;
            top: auto;
            width: 1px;
            height: 1px;
            overflow: hidden;
          }
        `}</style>
      </Container>
    );
  }
}
