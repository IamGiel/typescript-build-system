import './styles.scss';
import IMAGE_TWO from './assets/images/some_image2.jpeg';
import IMAGE_STUDY from './assets/images/study.svg';
import React from 'react';
import { Counter } from './Counter';

export const App = () => {
  const myName = 'GEL';
  return (
    <>
      <h1 className="text-3xl text-red-100 font-bold underline">
        Hello world!
      </h1>
      <div className="app">App Here -{myName}</div>
      <img src={IMAGE_TWO} alt="PNG" />
      <img src={IMAGE_STUDY} alt="STUDY" />
      <p>ENV NAME: {process.env.name}</p>
      <p>ENV MODE: {process.env.NODE_ENV}</p>
      <div className="count-container">
        <Counter></Counter>
      </div>
    </>
  );
};
