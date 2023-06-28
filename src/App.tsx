import './styles.scss';
import IMAGE_TWO from './assets/images/some_image2.jpeg';
import IMAGE_STUDY from './assets/images/study.svg';
import React from 'react';
import { Counter } from './Counter';
import { PepComponent } from './shared';

export const App = () => {
  const myName = 'GEL';
  return (
    <>
      <div className='flex flex-row justify-center'>
        <PepComponent stateToRender={'Default State'}/>
      </div>
    </>
  );
};
