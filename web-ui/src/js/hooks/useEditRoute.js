'use es6';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { LOCAL_STORAGE_REDIRECT } from '../constants/config';
import { getCurrentUserId, getSessionToken } from '../data/login';
import { fetchRoute, getRoute, updateStagedRoute } from '../data/routes';

export const useEditRoute = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const route = useSelector((state) => getRoute(state, id));
  const token = useSelector(getSessionToken);
  const currentUserId = useSelector(getCurrentUserId);

  useEffect(() => {
    if (route && route.user && currentUserId !== route.user.id) {
      try {
        localStorage.setItem(LOCAL_STORAGE_REDIRECT, window.location.pathname);
        history.push(`/?error=unauthorized`);
      } catch (error) {
        history.push(`/?error=unauthorized`);
      }
    }
  }, [history, route, currentUserId]);

  useEffect(() => {
    if (route) return;

    fetchRoute(id, token).then(dispatch);
  }, [dispatch, id, token, route]);

  useEffect(() => {
    if (!route) return;

    dispatch(updateStagedRoute(route));
  }, [dispatch, route]);
};
