'use es6';

import { useEffect, useState } from 'react';
import { useRequireAuth } from './useRequireAuth';
import { useInitMap } from './useInitMap';
import { useDirections } from './useDirections';
import { useGoToCurrentLocation } from './useGoToCurrentLocation';

export const useMap = () => {
  useRequireAuth();

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
