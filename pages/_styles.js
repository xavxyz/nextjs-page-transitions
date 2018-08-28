import { injectGlobal } from 'styled-components';

injectGlobal`
  @font-face {
     font-family: 'Josefin Sans';
     src: url('/static/JosefinSans-Regular.ttf');
  }

  @font-face {
     font-family: 'Josefin Sans';
     src: url('/static/JosefinSans-Bold.ttf');
     font-weight: bold;
  }

  @font-face {
     font-family: 'Playfair Display';
     src: url('/static/PlayfairDisplay-Regular.ttf');
  }

  body {
    background: white;
    color: #333;
    font-family: 'Josefin Sans', serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
    line-height: 1.2;
    overflow-x: hidden;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
    margin: 0;
  }

  h1,
  h2,
  h3,
  h4 {
    font-family: 'Playfair Display', serif;
    font-weight: normal;
  }

  .transition-group-wrapper {
    position: relative; /* xavier's dirty hack */
  }

  .page-enter,
  .page-exit {
    opacity: 0;
    transition: all 0.25s ease;
  }

  .page-enter-active,
  .page-exit-active {
    transition: all 0.25s ease;
    transform: translateZ(0);
    backface-visibility: hidden;
  }

  .page-enter-active {
    opacity: 1;
    position: absolute; /* xavier's dirty hack */
  }
`;
