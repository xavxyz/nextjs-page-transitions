import styled from 'styled-components';

const Content = styled.div`
  width: 60%;

  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

Content.displayName = 'Content';

export default Content;
