'use es6';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSessionToken } from '../data/login';
import { getStagedRoute, setMarkers } from '../data/routes';
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
      setMarkers(newPoints, token).then(dispatch);
    });
    return () => google.maps.event.removeListener(clickListener);
  }, [map, points, dispatch]);

  useEffect(() => {
    if (!points || !points.length) return;

    const start = new google.maps.Marker({
      poisition: points[0],
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        strokeColor: 'green',
        fillColor: 'green',
        fillOpacity: 1.0,
        scale: 4,
      },
      map,
    });
    const finish = new google.maps.Marker({
      position: points[points.length - 1],
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        strokeColor: 'red',
        fillColor: 'red',
        fillOpacity: 1.0,
        scale: 4,
      },
      map,
    });

    return () => {
      start.setMap(null);
      finish.setMap(null);
    };
  }, [points]);

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
