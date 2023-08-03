import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

export const Map = ({ canvasHeight, canvasWidth, coordinates }) => {
  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

    // Get the current location coordinates
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = coordinates.latitude
          ? coordinates.latitude
          : position.coords.latitude;
        const longitude = coordinates.longitude
          ? coordinates.longitude
          : position.coords.longitude;

        const map = new mapboxgl.Map({
          container: 'map',
          // style: 'mapbox://styles/mapbox/streets-v11',
          // style:'mapbox://styles/alphagiel/cljqn6pa8011901qma20y09hg/draft',
          style: 'mapbox://styles/alphagiel/cljqn6pa8011901qma20y09hg/draft',
          center: [longitude, latitude], // Set the initial map center coordinates
          zoom: 10, // Set the initial zoom level
        });

        // Add any additional map customization or interaction logic here

        // Clean up the map instance when the component unmounts
        return () => map.remove();
      },
      (error) => {
        console.log(error);
        // Handle the error if location access is denied or not available
      }
    );
  }, [coordinates]);

  useEffect(() => {
    const canvasElement = document.querySelector('.mapboxgl-canvas');
    if (canvasElement) {
      canvasElement.style.width = canvasWidth; // Adjust the width as needed
    }
  }, [canvasWidth]);

  return <div id="map" style={{ width: '100%', height: canvasHeight }}></div>;
};
