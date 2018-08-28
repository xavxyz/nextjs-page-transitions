import React from 'react';
import styled from 'styled-components';

import IconBase from '../components/IconBase';
import IconMapPin from '../components/IconMapPin';
import Main from '../components/Main';
import Paragraph from '../components/Paragraph';
import Content from '../components/Content';
import Places from '../components/Places';
import Sidebar from '../components/Sidebar';

export default class Index extends React.Component {
  mapContainer = React.createRef();

  // componentDidMount() {
  //   const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
  //   mapboxgl.accessToken =
  //     'pk.eyJ1Ijoic2RyYXNuZXIiLCJhIjoiY2pmZzBqZmptMjI1eTMzbWl1bGExMHppZyJ9.diPXryPOiyMuqcV4mpNOlg';
  //   const map = new mapboxgl.Map({
  //     container: this.mapContainer.current,
  //     style: 'mapbox://styles/sdrasner/cjfg0watl6rkv2sllf6hepdd5',
  //   });
  // }

  render() {
    return (
      <CustomMain>
        <Content>
          <Places places={this.props.places} />
        </Content>
        <CustomSidebar innerRef={this.mapContainer}>
          <Paragraph>
            <IconBase iconName="mappin">
              <IconMapPin />
            </IconBase>{' '}
            Checked in at Honolulu location
          </Paragraph>
        </CustomSidebar>
      </CustomMain>
    );
  }
}

const CustomMain = styled(Main)`
  padding-top: 20px;
  border-top: 1px solid #ddd;
  margin-top: 120px;
`;

const CustomSidebar = styled(Sidebar)`
  background: transparent;
`;
