'use es6';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSessionToken } from '../data/login';
import { getStagedRoute, postMarker } from '../data/routes';
import { toDirectionsResult } from '../data/toDirectionsResult';

export const useDirections = ({ map, directionsRenderer }) => {
  const dispatch = useDispatch();
  const { points, json } = useSelector(getStagedRoute);
  const token = useSelector(getSessionToken);

  useEffect(() => {
    if (!map) return;

    map.addListener('click', (mapsMouseEvent) => {
      const newPoints = (points || []).concat([mapsMouseEvent.latLng.toJSON()]);
      postMarker(newPoints, token).then(dispatch);
    });
  }, [map, points, dispatch]);

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
