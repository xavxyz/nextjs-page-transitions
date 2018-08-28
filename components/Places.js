// @flow
import * as React from 'react';
import styled from 'styled-components';

import Top from './Top';
import Paragraph from './Paragraph';
import Hr from './Hr';

import type { Place } from '../tools/types';

type Props = {
  places: Array<Place>,
};

export default class Places extends React.Component<Props> {
  render() {
    return this.props.places.map(place => (
      <Item key={place.name}>
        <Image src={place.img} alt={place.name} />
        <Top>
          <strong>{place.name}</strong>
        </Top>
        <Paragraph>{place.description}</Paragraph>
        <Hr />
      </Item>
    ));
  }
}

const Item = styled.div`
  padding: 10px 0;
`;

const Image = styled.img`
  float: left;
  margin: 0 15px 15px 0;
`;
