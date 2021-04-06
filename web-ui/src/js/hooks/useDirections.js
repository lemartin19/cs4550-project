'use es6';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSessionToken } from '../data/login';
import { getStagedRoute, postMarker } from '../data/routes';
import { toDirectionsResult } from '../data/toDirectionsResult';

/* global google */

export const useDirections = ({ map, directionsRenderer }) => {
  const dispatch = useDispatch();
  const { points, directions } = useSelector(getStagedRoute);
  const token = useSelector(getSessionToken);

  useEffect(() => {
    if (!map) return;

    const clickListener = map.addListener('click', (mapsMouseEvent) => {
      const newPoints = [...(points || []), mapsMouseEvent.latLng.toJSON()];
      postMarker(newPoints, token).then(dispatch);
    });
    return () => google.maps.event.removeListener(clickListener);
  }, [map, points, dispatch]);

  useEffect(() => {
    if (directionsRenderer && directions && directions.length) {
      const directionsResult = toDirectionsResult(directions);
      directionsRenderer.setDirections({
        routes: directionsResult,
        request: { travelMode: 'WALKING' },
      });
    }
  }, [directionsRenderer, directions]);
};
