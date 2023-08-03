import * as React from 'react';
import './scribbleSpinner.css';

const ScribbleSpinner = (props) => {
  return <div className={props.purple === true ? 'pLoader' : 'Loader'}></div>;
};

export default ScribbleSpinner;
