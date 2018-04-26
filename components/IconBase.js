import React from 'react';

export default class Svg extends React.Component {
  static defaultProps = {
    iconName: 'box',
    width: 18,
    height: 18,
    iconColor: 'currentColor',
  };

  render() {
    const {
      width,
      height,
      iconName,
      iconColor,
      children,
      className,
    } = this.props;
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 24 24"
        aria-labelledby={iconName}
        role="presentation"
        className={className}
      >
        <title id={iconName} lang="en">
          {iconName} icon
        </title>
        <g fill={iconColor}>{children}</g>
        <style jsx>{`
          svg {
            display: inline-block;
            vertical-align: baseline;
            /*
              Sarah in the original app about the next line:
                "yes, I'm that particular about formatting"
              Xavier adapting to NextJS:
                "this component is dope"
            */
            margin-bottom: -2px;
          }
        `}</style>
      </svg>
    );
  }
}
