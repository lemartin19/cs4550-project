'use es6';

import { useEffect } from 'react';

/* global google */

const createCurrentLocationButton = () => {
  const currentLocationButton = document.createElement('button');
  currentLocationButton.id = 'go-to-current-location';
  currentLocationButton.textContent = 'Pan to Current Location';
  currentLocationButton.classList.add(
    'custom-map-control-button',
    'btn',
    'btn-primary',
    'mt-2'
  );
  return currentLocationButton;
};

const createUndoMarkerButton = () => {
  const undoMarkerButton = document.createElement('button');
  undoMarkerButton.id = 'undo-marker';
  undoMarkerButton.textContent = 'Undo marker';
  undoMarkerButton.classList.add(
    'custom-map-control-button',
    'btn',
    'btn-light',
    'mt-2'
  );
  return undoMarkerButton;
};

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

  const currentLocationButton = createCurrentLocationButton();
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(
    currentLocationButton
  );
  const undoMarkerButton = createUndoMarkerButton();
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(undoMarkerButton);

  if (typeof window.initMapCallback === 'function') {
    window.initMapCallback({
      map,
      infoWindow,
      directionsRenderer,
      currentLocationButton,
      undoMarkerButton,
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
