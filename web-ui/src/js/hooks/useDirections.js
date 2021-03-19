'use es6';

import { useEffect, useState } from 'react';
import { fetchRoute } from '../data/routes';
import { toDirectionsResult } from '../data/toDirectionsResult';

export const useDirections = ({ directionsRenderer }) => {
  const [route, setRoute] = useState();

  useEffect(() => {
    fetchRoute().then(setRoute);
  }, []);

  useEffect(() => {
    if (directionsRenderer && route) {
      const directionsResult = toDirectionsResult(route);
      directionsRenderer.setDirections({
        routes: directionsResult,
        request: { travelMode: 'WALKING' },
      });
    }
  }, [directionsRenderer, route]);
};
