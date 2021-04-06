'use es6';

import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { getSessionToken } from '../data/login';
import { createRoute, getStagedRoute } from '../data/routes';

export const useEditPanel = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [routeInfo, setRouteInfo] = useState({
    name: '',
    description: '',
    error: null,
  });
  const routeDirections = useSelector(getStagedRoute);
  const token = useSelector(getSessionToken);
  const [isLoading, setIsLoading] = useState(false);

  const setField = useCallback((field, value) => {
    setRouteInfo((state) => Object.assign({}, state, { [field]: value }));
  }, []);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();

      if (!routeDirections.points || !routeDirections.points.length) {
        setField('error', 'Must create a route to save.');
        return;
      }

      setIsLoading(true);
      createRoute({ ...routeInfo, ...routeDirections }, token)
        .then((action) => {
          dispatch(action);
          setIsLoading(false);
          history.push(`/routes/${action.payload.id}`);
        })
        .catch(({ message }) => {
          setIsLoading(false);
          setField('error', message);
        });
    },
    [routeInfo, routeDirections, token, dispatch]
  );

  return { routeInfo, setField, isLoading, onSubmit };
};
