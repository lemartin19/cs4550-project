'use es6';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSessionToken } from '../data/login';
import { fetchRoutes, getRoutes, getRoutesAreLoaded } from '../data/routes';

export const useRouteFeed = () => {
  const dispatch = useDispatch();
  const areLoaded = useSelector(getRoutesAreLoaded);
  const routes = useSelector(getRoutes);
  const token = useSelector(getSessionToken);

  useEffect(() => {
    if (areLoaded) return;

    fetchRoutes(token).then(dispatch);
  }, [routes, areLoaded]);

  return { areLoaded, routes: Object.values(routes) };
};
