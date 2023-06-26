import './styles.scss';
import IMAGE_TWO from './assets/images/some_image2.jpeg';
import IMAGE_STUDY from './assets/images/study.svg';
import React from 'react'
import { Counter } from './Counter';

export const App = () => {
  return (
    <> 
      <div className='app'>App Here</div>
      <img src={IMAGE_TWO} alt="PNG IMAGE" />
      <img src={IMAGE_STUDY} alt="STUDY IMAGE" />
      <p>ENV NAME: {process.env.name}</p>
      <p>ENV MODE: {process.env.NODE_ENV}</p>
      <div className='count-container'>
        <Counter></Counter>
      </div>
    </> 
  )
}
