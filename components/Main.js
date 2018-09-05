import styled from 'styled-components';

const Main = styled.main`
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 1030px) {
    padding: 0 20px;
  }

  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

Main.displayName = 'Main';

export default Main;
