'use es6';

import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { getSessionToken } from '../data/login';
import { postMarker } from '../data/routes';
import { toDirectionsResult } from '../data/toDirectionsResult';

export const useDirections = ({ map, directionsRenderer }) => {
  const [route, setRoute] = useState();
  const points = useRef([]);
  const token = useSelector(getSessionToken);

  useEffect(() => {
    if (!map) return;

    map.addListener('click', (mapsMouseEvent) => {
      points.current.push(mapsMouseEvent.latLng.toJSON());
      postMarker(points.current, token).then(setRoute);
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
