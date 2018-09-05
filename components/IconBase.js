// @flow

import * as React from 'react';
import styled from 'styled-components';

type Props = {
  children: React.Node,
  width?: number,
  height?: number,
  iconName?: string,
  iconColor?: string,
  style?: { [string]: string | number },
};

export default class Icon extends React.Component<Props> {
  static defaultProps = {
    width: 18,
    height: 18,
    iconName: 'box',
    iconColor: 'currentColor',
  };

  render() {
    const { width, height, iconName, iconColor, children, style } = this.props;
    return (
      <FormattedSvg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 24 24"
        aria-labelledby={iconName}
        role="presentation"
        style={style}
      >
        <title id={iconName} lang="en">
          {iconName} icon
        </title>
        <g fill={iconColor}>{children}</g>
      </FormattedSvg>
    );
  }
}

const FormattedSvg = styled.svg`
  display: inline-block;
  vertical-align: baseline;
  /*
    Sarah in the original app about the next line:
      "yes, I'm that particular about formatting"
    Xavier adapting to NextJS:
      "🙌"
  */
  margin-bottom: -2px;
`;
