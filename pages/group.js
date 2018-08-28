import styled from 'styled-components';
import IconBase from '../components/IconBase';
import IconCalendar from '../components/IconCalendar';
import Main from '../components/Main';
import Content from '../components/Content';
import Top from '../components/Top';
import Hr from '../components/Hr';
import Sidebar from '../components/Sidebar';

const boxGridStyles = [
  { gridColumn: '1 / 5' },
  {
    gridColumn: '1 / 3',
    gridRow: '2 / 4',
  },
  { gridColumn: '3 / 5' },
];

export default () => (
  <Main>
    <Content>
      <Top>Group Activities</Top>
      <h1>4 Person Trip to Hawaii</h1>
      <Hr />
      <Wrapper>
        {Array(5)
          .fill(null)
          .map((_, index) => (
            <Box key={index} index={index + 1} style={boxGridStyles[index]} />
          ))}
      </Wrapper>
    </Content>

    <Sidebar>
      <h3>
        <IconBase iconName="calendar">
          <IconCalendar />
        </IconBase>{' '}
        Schedule
      </h3>
      <TopText>Sunday</TopText>
      <Text>
        Arrival: We settled in and decided to go snorkeling. We saw spotted
        dolphins, tons of whales - one whale went right under the boat, and, of
        course, plenty of sea turtles. The snorkeling area is a little small and
        can get crowded, but we still had great opportunities to watch the
        turtles. The crew was terrific - Jason, Jackson, and Shane. We would
        definitely recommend this activity, and will do it again if we ever get
        back to Hawaii!
      </Text>
      <TopText>Monday</TopText>
      <Text>
        After such an exciting first day, we decided to take it a bit easier and
        just get a nice lunch as our day activity. Had a wonderful time getting
        an opportunity to walk around a few blocks of Ala Moana and sampling
        some of the local eats that you can't really get back home. Every stop
        had something new and interesting to try, and there wasn't a single
        thing I tried that I really disliked.
      </Text>
    </Sidebar>
  </Main>
);

const Wrapper = styled.div`
  margin: 10px 0 20px 0;
  width: 100%;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(4, 24%);
  grid-template-rows: repeat(3, 120px);
  justify-content: center;
  align-content: end;
`;

const Box = styled.div`
  border-radius: 3px;
  background: url('/static/hawaii${props =>
    props.index}.jpg') center center no-repeat;
  background-size: cover;
`;

const TopText = styled.p`
  padding-bottom: 10px;
`;

const Text = styled.p`
  padding-bottom: 10px;
`;
