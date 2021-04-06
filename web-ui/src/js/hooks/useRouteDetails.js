'use es6';

import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { isFilterMetric, toggleIsMetric } from '../data/filters';
import { getSessionToken } from '../data/login';
import { fetchRoute, getRoute } from '../data/routes';

export const useRouteDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const isMetric = useSelector(isFilterMetric);
  const route = useSelector((state) => getRoute(state, id));
  const distance = route ? route.distance : 0;
  const token = useSelector(getSessionToken);

  useEffect(() => {
    if (route) return;

    fetchRoute(id, token).then(dispatch);
  }, [dispatch, id, route]);

  const formattedDistance = useMemo(
    () =>
      isMetric
        ? `${(distance / 1000).toFixed(2)} km`
        : `${(distance / 1609.34).toFixed(2)} mi`,
    [distance, isMetric]
  );

  return {
    route,
    formattedDistance,
    toggleIsMetric: () => dispatch(toggleIsMetric()),
  };
};
