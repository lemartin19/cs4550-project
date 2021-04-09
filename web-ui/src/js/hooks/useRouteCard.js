'use es6';

import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isFilterMetric } from '../data/filters';
import { getCurrentUserId } from '../data/login';

export const useRouteCard = (distance = 0) => {
  const dispatch = useDispatch();
  const currentUserId = useSelector(getCurrentUserId);
  const isMetric = useSelector(isFilterMetric);
  const formattedDistance = useMemo(
    () =>
      isMetric
        ? `${(distance / 1000).toFixed(2)} km`
        : `${(distance / 1609.34).toFixed(2)} mi`,
    [distance, isMetric]
  );
  return { dispatch, formattedDistance, currentUserId };
};
