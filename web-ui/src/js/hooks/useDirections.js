'use es6';

import { useEffect, useState, useRef } from 'react';
// import { fetchRoute } from '../data/routes';
import { postMarker } from '../data/routes';
import { toDirectionsResult } from '../data/toDirectionsResult';

export const useDirections = ({ map, directionsRenderer }) => {
  const [route, setRoute] = useState();
  const points = useRef([]);

  useEffect(() => {
    if (!map) return;
    // fetchRoute().then(setRoute);
    map.addListener('click', (mapsMouseEvent) => {
      points.current.push(mapsMouseEvent.latLng.toJSON());
      postMarker(points.current).then(setRoute);
    });
  }, [map]);

  useEffect(() => {
    if (directionsRenderer && route && route !== []) {
      const directionsResult = toDirectionsResult(route);
      directionsRenderer.setDirections({
        routes: directionsResult,
        request: { travelMode: 'WALKING' },
      });
    }
  }, [directionsRenderer, route]);
};
