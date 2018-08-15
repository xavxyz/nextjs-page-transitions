// @flow

import * as React from 'react';
import styled from 'styled-components';
import type { User } from '../data/types';

type Props = {
  selectedUser: User,
};
export default class AppStats extends React.Component<Props> {
  render() {
    const { selectedUser } = this.props;
    return (
      <Stats>
        <Bio>
          <p>{selectedUser.bio}</p>
        </Bio>
        <div>
          <span>Followers</span>
          <br />
          <LargeText>{selectedUser.followers}</LargeText>
        </div>
        <div>
          <span>Following</span>
          <br />
          <LargeText>{selectedUser.following}</LargeText>
        </div>
      </Stats>
    );
  }
}

const Stats = styled.div`
  font-family: 'Playfair Display', serif;
  display: flex;
  position: absolute;
  right: 0;
  top: 330px;
  width: 60%;
  justify-content: space-between;
  line-height: 1.2;

  @media screen and (max-width: 600px) {
    display: none;
  }

  @media screen and (max-width: 980px) {
    justify-content: flex-end;

    > * {
      padding-left: 20px;
    }
  }
`;

const Bio = styled.div`
  width: 60%;
  line-height: 1.4;

  @media screen and (max-width: 980px) {
    display: none;
  }
`;

const LargeText = styled.span`
  font-size: 40px;
`;
