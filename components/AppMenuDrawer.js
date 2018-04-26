import React from 'react';
import Link from 'next/link';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { TweenMax, Sine } from 'gsap';

export default class AppMenuDrawer extends React.Component {
  menuRef = React.createRef();

  componentDidMount() {
    const menuEl = this.menuRef.current;

    TweenMax.set(menuEl, {
      opacity: 0,
      scale: 0,
      transformOrigin: '100% 0%',
    });

    TweenMax.set(menuEl.childNodes, {
      opacity: 0,
    });

    TweenMax.fromTo(
      menuEl,
      0.2,
      {
        opacity: 0,
        scale: 0,
      },
      {
        opacity: 1,
        scale: 1,
        ease: Sine.easeOut,
      }
    );

    TweenMax.staggerFromTo(
      menuEl.childNodes,
      0.45,
      {
        opacity: 0,
      },
      {
        delay: 0.1,
        opacity: 1,
        ease: Sine.easeOut,
      },
      0.04
    );
  }

  render() {
    const { selectedUser } = this.props;

    return (
      <div className="menudrawer" ref={this.menuRef}>
        <Link href="/">
          <a>{firstName(selectedUser.name)}'s Home</a>
        </Link>
        <br />
        <Link href="/place">
          <a>{firstName(selectedUser.name)}'s Places</a>
        </Link>
        <br />
        <Link href="/group">
          <a>{firstName(selectedUser.name)}'s Group Trips</a>
        </Link>
        <style jsx>
          {`
            div {
              background: rgba(0, 0, 0, 0.8);
              line-height: 1.8;
              text-align: right;
              position: absolute;
              right: 0px;
              top: 45px;
              padding: 20px;
              border-radius: 4px;
              z-index: 10000;
            }

            a,
            a:visited,
            a:active {
              cursor: pointer;
              color: white;
            }
          `}
        </style>
      </div>
    );
  }
}

const firstName = input => {
  const lastIndex = input.lastIndexOf(' ');
  return input.substring(0, lastIndex);
};
