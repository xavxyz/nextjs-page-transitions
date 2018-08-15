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

  button {
    margin-bottom: 10px;
    background: orangered;
    border: 0;
    cursor: pointer;
    padding: 6px 8px;
    font-size: 16px;
    color: white;
    border-radius: 4px;
  }

  h1,
  h2,
  h3,
  h4 {
    font-family: 'Playfair Display', serif;
    font-weight: normal;
  }

  main {
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
  }

  .top {
    text-transform: uppercase;
    font-size: 14px;
    color: #666;
    padding: 0;
    margin: 30px 0 0;
  }

  .places {
    width: 60%;

    @media screen and (max-width: 600px) {
      width: 100%;
    }
  }

  aside.sidebar {
    width: 35%;
    padding: 20px;
    margin: 40px 0 0 20px;
    background: #eee;
    float: right;

    @media screen and (max-width: 600px) {
      width: 100%;
      margin: 10px 0;
    }
  }

  hr {
    border-top: 1px solid #ccc;
    border-bottom: none;
    margin-top: 15px;
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

  /* screen reader only */
  .hidden {
    position: absolute;
    left: -10000px;
    top: auto;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }
`;
