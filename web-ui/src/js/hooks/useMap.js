'use es6';

import { useEffect, useState } from 'react';
import { useInitMap } from './useInitMap';
import { useDirections } from './useDirections';
import { useGoToCurrentLocation } from './useGoToCurrentLocation';

export const useMap = () => {
  const [mapObjects, setMapObjects] = useState({});

  useEffect(() => {
    window.initMapCallback = setMapObjects;
    return () => {
      window.initMapCallback = undefined;
    };
  }, []);

  useInitMap();
  useDirections(mapObjects);
  useGoToCurrentLocation(mapObjects);
};
