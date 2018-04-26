import React from 'react';

export default ({ selectedUser }) => (
  <div className="stats">
    <div className="bio">
      <p>{selectedUser.bio}</p>
    </div>
    <div>
      <span className="desc">Followers</span>
      <br />
      <span className="lg">{selectedUser.followers}</span>
    </div>
    <div>
      <span className="desc">Following</span>
      <br />
      <span className="lg">{selectedUser.following}</span>
    </div>
    <style jsx global>
      {`
        .stats {
          font-family: 'Playfair Display', serif;
          display: flex;
          position: absolute;
          right: 0;
          top: 330px;
          width: 60%;
          justify-content: space-between;
          line-height: 1.2;
        }

        .lg {
          font-size: 40px;
        }

        .bio {
          width: 60%;
          line-height: 1.4;
        }

        @media screen and (max-width: 980px) {
          .bio {
            display: none;
          }
          .stats {
            justify-content: flex-end;
            div {
              padding-left: 20px;
            }
          }
        }

        @media screen and (max-width: 600px) {
          .stats {
            display: none;
          }
        }
      `}
    </style>
  </div>
);
