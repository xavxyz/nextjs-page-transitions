import App, { Container } from 'next/app';
import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import AppNavigation from '../components/AppNavigation';
import AppFooter from '../components/AppFooter';
import data from '../tools/data';
import './_styles';

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
      </Container>
    );
  }
}
