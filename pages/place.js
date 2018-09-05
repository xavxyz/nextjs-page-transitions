import styled from 'styled-components';
import IconBase from '../components/IconBase';
import IconMapPin from '../components/IconMapPin';
import AppStarRating from '../components/AppStarRating';
import Main from '../components/Main';
import Content from '../components/Content';
import Top from '../components/Top';
import Paragraph from '../components/Paragraph';
import Sidebar from '../components/Sidebar';
import Places from '../components/Places';

export default ({ users, places, selectedUser }) => (
  <Main>
    <Content>
      <Top>
        {selectedUser.name}
        's Places
      </Top>
      <Heading>{places[0].name}</Heading>
      <Paragraph>
        <strong>Rating: {places[0].rating}</strong>
      </Paragraph>
      <AppStarRating />
      <Image />
      <Paragraph>{places[0].description}</Paragraph>
    </Content>

    <Sidebar>
      <h3>Other Trips</h3>
      <Places places={places} />
    </Sidebar>
  </Main>
);

const Heading = styled.h1`
  font-size: 45px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
`;

const Image = styled.div`
  background: url('/static/header1.jpg') center center;
  background-size: cover;
  width: 100%;
  height: 240px;
`;
