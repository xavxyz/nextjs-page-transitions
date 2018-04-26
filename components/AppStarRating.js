import React from 'react';
import IconBase from './IconBase';
import IconStarFull from './IconStarFull';
import IconStarEmpty from './IconStarEmpty';

export default () => {
  // x: the v-for from vue is amazing, looping on number range is dope
  const seqN = Array(4).fill(null);
  const seqX = Array(1).fill(null);

  return (
    <div>
      {seqN.map((_, n) => (
        <IconBase iconName="full star" iconColor="orangered" key={n}>
          <IconStarFull />
        </IconBase>
      ))}

      {seqX.map((_, x) => (
        <IconBase iconName="empty star" iconColor="orangered" key={x + 5}>
          <IconStarEmpty />
        </IconBase>
      ))}
    </div>
  );
};
