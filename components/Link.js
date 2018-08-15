// @flow
import * as React from 'react';
import NextLink from 'next/link';
import styled from 'styled-components';

type Props = {
  children: React.Node,
  href: string,
  color?: string,
  active?: boolean,
};
export default class Link extends React.Component<Props> {
  render() {
    const { children, href, color, active } = this.props;
    return (
      <NextLink href={href} prefetch>
        <Anchor color={color} active={active}>
          {children}
        </Anchor>
      </NextLink>
    );
  }
}

const Anchor = styled.a`
  &,
  &:visited,
  &:active {
    color: ${props => (props.color ? props.color : 'orangered')};
    text-decoration: none;
    cursor: pointer;
  }

  ${props => props.active && `font-weight: bold;`};
`;
