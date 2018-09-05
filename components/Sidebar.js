import styled from 'styled-components';

const Sidebar = styled.aside`
  width: 35%;
  padding: 20px;
  margin: 40px 0 0 20px;
  background: #eee;
  float: right;

  @media screen and (max-width: 600px) {
    width: 100%;
    margin: 10px 0;
  }
`;

Sidebar.displayName = 'Sidebar';

export default Sidebar;
