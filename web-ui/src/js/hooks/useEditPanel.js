'use es6';

import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSessionToken } from '../data/login';
import { createRoute, getStagedRoute } from '../data/routes';

export const useEditPanel = () => {
  const dispatch = useDispatch();
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
      setIsLoading(true);
      createRoute({ ...routeInfo, ...routeDirections }, token)
        .then(dispatch)
        .then(() => {
          setIsLoading(false);
          history.push(`/routes`);
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
