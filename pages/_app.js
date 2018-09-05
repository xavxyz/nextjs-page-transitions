import App, { Container } from 'next/app';
import React from 'react';
import styled from 'styled-components';
import { Transition } from 'react-spring';
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
          <Transition
            from={{ opacity: 0 }}
            enter={{ opacity: 1 }}
            leave={{ opacity: 0 }}
            keys={this.props.router.route}
          >
            {style => (
              <Positioner style={style}>
                <Component
                  {...pageProps}
                  {...this.state}
                  selectedUser={selectedUser}
                />
                <AppFooter />
              </Positioner>
            )}
          </Transition>
        </div>
      </Container>
    );
  }
}

const Positioner = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
