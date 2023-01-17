import React from 'react';
import '../styles/coins.css';
import anime from 'animejs';


const Coins = () => {
    anime  ({
        targets: '#animationWrapper .coin',
        duration: 1500,
        keyframes: [
          {
            duration: 300,
            translateY: function(el, i) {
              return anime.random(0, 50) * -1;
            },
            translateX: function(el, i) {
              return anime.random(0, 50) * -1;
            },
            rotateX: function(el, i) {
              return anime.random(0, 180);
            },
            rotateY: function(el, i) {
              return anime.random(0, 180);
            }
          },
          {
            duration: 1200,
            easing: 'easeOutQuad',
            rotateX: function(el, i) {
              return anime.random(0, 180);
            },
            rotateY: function(el, i) {
              return anime.random(0, 180);
            },
            translateX: -450,
            translateY: -450,
            opacity: 0,
            delay: anime.stagger(100) // increase delay by 100ms for each elements.
          }
        ],
        loop: false
      });
  return (
    <div dir='ltr' id="animationWrapper">
        <div class="coin"></div>
        <div class="coin"></div>
        <div class="coin"></div>
        <div class="coin"></div>
        <div class="coin"></div>
        <div class="coin"></div>
        <div class="coin"></div>
        <div class="coin"></div>
        <div class="coin"></div>
        <div class="coin"></div>
        <div class="coin"></div>
        <div class="coin"></div>
      </div>
  )
}

export default Coins
