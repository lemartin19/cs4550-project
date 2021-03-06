'use es6';

import { useEffect } from 'react';

const handleLocationError = (map, browserHasGeolocation, infoWindow, pos) => {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? 'Error: The Geolocation service failed.'
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
};

const goToCurrentLocation = ({ map, infoWindow }) => {
  if (!map || !infoWindow) return;

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        map.setCenter(pos);
      },
      () => {
        handleLocationError(map, true, infoWindow, map.getCenter());
      }
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(map, false, infoWindow, map.getCenter());
  }
};

export const useGoToCurrentLocation = ({
  map,
  infoWindow,
  currentLocationButton,
}) => {
  useEffect(() => {
    goToCurrentLocation({ map, infoWindow });
  }, [map, infoWindow]);

  useEffect(() => {
    if (currentLocationButton) {
      currentLocationButton.addEventListener('click', () =>
        goToCurrentLocation({ map, infoWindow })
      );
    }
  }, [map, infoWindow, currentLocationButton]);
};
