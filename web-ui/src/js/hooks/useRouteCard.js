'use es6';

import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isFilterMetric } from '../data/filters';
import { getCurrentUserId, getSessionToken } from '../data/login';
import { deleteRoute } from '../data/routes';

export const useRouteCard = (id, distance = 0) => {
  const dispatch = useDispatch();
  const currentUserId = useSelector(getCurrentUserId);
  const isMetric = useSelector(isFilterMetric);
  const token = useSelector(getSessionToken);

  const formattedDistance = useMemo(
    () =>
      isMetric
        ? `${(distance / 1000).toFixed(2)} km`
        : `${(distance / 1609.34).toFixed(2)} mi`,
    [distance, isMetric]
  );

  const onDelete = useCallback(() => deleteRoute(id, token).then(dispatch), [
    dispatch,
    id,
    token,
  ]);

  return {
    formattedDistance,
    currentUserId,
    onDelete,
  };
};
