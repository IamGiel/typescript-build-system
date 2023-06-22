import './styles.scss';
import IMAGE_TWO from './assets/images/some_image2.jpeg';
import IMAGE_STUDY from './assets/images/study.svg';
import React from 'react'

export const App = () => {
  return (
    <> 
      <div className='app'>App</div>
      <img src={IMAGE_TWO} alt="PNG IMAGE" />
      <img src={IMAGE_STUDY} alt="STUDY IMAGE" />
    </>
  )
}
