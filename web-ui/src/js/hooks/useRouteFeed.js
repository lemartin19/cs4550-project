'use es6';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQueryParams } from '../hooks/useQueryParams';
import { getSessionToken } from '../data/login';
import { fetchRoutes, getRoutes, getRoutesAreLoaded } from '../data/routes';

export const useRouteFeed = () => {
  const dispatch = useDispatch();
  const areLoaded = useSelector(getRoutesAreLoaded);
  const routes = useSelector(getRoutes);
  const token = useSelector(getSessionToken);
  const { error } = useQueryParams();

  useEffect(() => {
    if (areLoaded) return;

    fetchRoutes(token).then(dispatch);
  }, [routes, areLoaded]);

  return {
    token,
    areLoaded,
    routes: Object.values(routes),
    error:
      error === 'unauthorized' ? 'You are not authorized to do that' : error,
  };
};
