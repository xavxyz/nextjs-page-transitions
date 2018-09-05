import React from 'react';
import styled from 'styled-components';
import IconBase from './IconBase';
import IconStarFull from './IconStarFull';
import IconStarEmpty from './IconStarEmpty';

export default () => {
  const seqN = Array(4).fill(null);

  return (
    <Wrapper>
      {seqN.map((_, n) => (
        <IconBase iconName="full star" iconColor="orangered" key={n}>
          <IconStarFull />
        </IconBase>
      ))}
      <IconBase iconName="empty star" iconColor="orangered">
        <IconStarEmpty />
      </IconBase>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 10px 0;
`;
