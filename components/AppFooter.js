import React from 'react';

export default () => (
  <footer>
    <div>
      Original project by{' '}
      <a href="https://twitter.com/sarah_edo" target="_blank">
        sarah_edo
      </a>, built with{' '}
      <a
        href="https://github.com/xavczen/nextjs-page-transitions"
        target="_blank"
      >
        Vue & Nuxt (code)
      </a>
    </div>
    <div>
      You are viewing a fork adapted by{' '}
      <a href="https://twitter.com/xavczen" target="_blank">
        xavczen
      </a>, built with{' '}
      <a
        href="https://github.com/xavczen/nextjs-transitions-travelapp"
        target="_blank"
      >
        React & Next (code)
      </a>.
    </div>
    <style jsx>
      {`
        footer {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 10px;
          background: black;
          color: white;
          text-align: center;
          letter-spacing: 0.03em;
          margin-top: 30px;
          width: 100%;
        }

        a,
        a:visited,
        a:active {
          color: white;
          font-weight: bold;
          text-decoration: none;
          padding-left: 6px;
        }
      `}
    </style>
  </footer>
);
