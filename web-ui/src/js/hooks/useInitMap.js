'use es6';

import { useEffect } from 'react';

/* global google */

const initMap = () => {
  const map = new google.maps.Map(document.getElementById('Map'), {
    center: { lat: 42.3601, lng: -71.0589 },
    zoom: 13,
    mapTypeControl: false,
    streetViewControl: false,
  });
  const infoWindow = new google.maps.InfoWindow();
  const directionsRenderer = new google.maps.DirectionsRenderer({
    suppressMarkers: true,
  });
  directionsRenderer.setMap(map);

  const currentLocationButton = document.createElement('button');
  currentLocationButton.id = 'go-to-current-location';
  currentLocationButton.textContent = 'Pan to Current Location';
  currentLocationButton.classList.add(
    'custom-map-control-button',
    'btn',
    'btn-primary',
    'mt-2'
  );
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(
    currentLocationButton
  );

  if (typeof window.initMapCallback === 'function') {
    window.initMapCallback({
      map,
      infoWindow,
      directionsRenderer,
      currentLocationButton,
    });
  }
};

export const useInitMap = () => {
  useEffect(() => {
    const googleMapsScript = document.createElement('script');
    googleMapsScript.src =
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyAA8OS03M6dxV859lJuJQDn7S0GLnV_L78&libraries=geometry&callback=initMap';
    googleMapsScript.async = true;

    document.body.appendChild(googleMapsScript);
    window.initMap = initMap;

    return () => {
      document.body.removeChild(googleMapsScript);
      window.initMap = undefined;
    };
  }, []);
};
