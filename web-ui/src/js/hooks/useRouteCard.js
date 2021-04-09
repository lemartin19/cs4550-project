'use es6';

import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { isFilterMetric } from '../data/filters';
import { getCurrentUserId, getSessionToken } from '../data/login';
import { deleteRoute } from '../data/routes';

export const useRouteCard = (distance = 0) => {
  const dispatch = useDispatch();
  const { id } = useParams();
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

  return { formattedDistance, currentUserId, onDelete };
};
