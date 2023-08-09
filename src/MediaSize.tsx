import React, { useEffect, useState } from 'react';

export const MediaSize = () => {
  const [deviceSize, setDeviceSize] = useState('');

  const sizeIdentifier = () => {
    if (window.innerWidth >= 1200) {
      return 'large device';
    } else if (window.innerWidth >= 992) {
      return 'medium device';
    } else if (window.innerWidth >= 768) {
      return 'small device';
    } else {
      return 'extra small device';
    }
  };

  const updateDeviceSize = () => {
    const newSize = sizeIdentifier();
    setDeviceSize(newSize);
  };

  useEffect(() => {
    updateDeviceSize(); // Initial size on component mount
    window.addEventListener('resize', updateDeviceSize);

    return () => {
      window.removeEventListener('resize', updateDeviceSize);
    };
  }, []);

  return <span>{deviceSize}</span>;
};
