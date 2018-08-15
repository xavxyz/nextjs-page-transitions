import React from 'react';
import Router from 'next/router';

class NextJSProxy extends React.Component {
  constructor(props) {
    super(props);

    this.__realRouter = Router.router;
    Router.router = createRouterMock();
  }

  componentWillUnmount() {
    if (this.__realRouter) {
      Router.router = this.__realRouter;
    }
  }

  render() {
    const { nextProxy, ...rest } = this.props;
    const { value: NextProxy, next } = nextProxy;

    return <NextProxy {...rest} nextProxy={next()} />;
  }
}

function createRouterMock() {
  return {
    push: () => {},
    prefetch: () => {},
    replace: () => {},
  };
}

export default [NextJSProxy];
