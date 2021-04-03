'use es6';

import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSessionToken } from '../data/login';
import { getStagedRoute, postMarker } from '../data/routes';
import { toDirectionsResult } from '../data/toDirectionsResult';

export const useDirections = ({ map, directionsRenderer }) => {
  const dispatch = useDispatch();
  const { json } = useSelector(getStagedRoute);
  const points = useRef([]);
  const token = useSelector(getSessionToken);

  useEffect(() => {
    if (!map) return;

    map.addListener('click', (mapsMouseEvent) => {
      points.current.push(mapsMouseEvent.latLng.toJSON());
      postMarker(points.current, token).then(dispatch);
    });
  }, [map, dispatch]);

  useEffect(() => {
    if (directionsRenderer && json && json.length) {
      const directionsResult = toDirectionsResult(json);
      directionsRenderer.setDirections({
        routes: directionsResult,
        request: { travelMode: 'WALKING' },
      });
    }
  }, [directionsRenderer, json]);
};
