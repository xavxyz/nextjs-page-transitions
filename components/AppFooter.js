import * as React from 'react';
import styled from 'styled-components';

export default () => (
  <Footer>
    <div>
      Original project by{' '}
      <Anchor href="https://twitter.com/sarah_edo" target="_blank">
        sarah_edo
      </Anchor>
      , built with{' '}
      <Anchor
        href="https://github.com/sdras/page-transitions-travelapp"
        target="_blank"
      >
        Vue & Nuxt (code)
      </Anchor>
    </div>
    <div>
      You are viewing a fork adapted by{' '}
      <Anchor href="https://twitter.com/xavczen" target="_blank">
        xavczen
      </Anchor>
      , built with{' '}
      <Anchor
        href="https://github.com/xavczen/nextjs-page-transitions"
        target="_blank"
      >
        React & Next (code)
      </Anchor>
      .
    </div>
  </Footer>
);

const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background: black;
  color: white;
  text-align: center;
  letter-spacing: 0.03em;
  margin-top: 30px;
  width: 100%;
`;

const Anchor = styled.a`
  &,
  &:visited,
  &:active {
    color: white;
    font-weight: bold;
    text-decoration: none;
    padding-left: 6px;
  }
`;
