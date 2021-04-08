'use es6';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getSessionToken } from '../data/login';
import { fetchRoute, getRoute, updateStagedRoute } from '../data/routes';

export const useEditRoute = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const route = useSelector((state) => getRoute(state, id));
  const token = useSelector(getSessionToken);

  useEffect(() => {
    if (route) return;

    fetchRoute(id, token).then(dispatch);
  }, [dispatch, id, token, route]);

  useEffect(() => {
    if (!route) return;

    dispatch(updateStagedRoute(route));
  }, [dispatch, route]);
};
