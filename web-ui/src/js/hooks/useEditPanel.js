'use es6';

import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { getSessionToken } from '../data/login';
import { getStagedRoute, saveRoute, updateStagedRoute } from '../data/routes';

export const useEditPanel = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const stagedRoute = useSelector(getStagedRoute);
  const token = useSelector(getSessionToken);
  const [isLoading, setIsLoading] = useState(false);

  const setField = useCallback(
    (field, value) => {
      dispatch(updateStagedRoute({ [field]: value }));
    },
    [dispatch]
  );

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();

      if (!stagedRoute.points || !stagedRoute.points.length) {
        setField('error', 'Must create a route to save.');
        return;
      }

      setIsLoading(true);
      saveRoute({ ...stagedRoute }, token)
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
    [stagedRoute, token, dispatch]
  );

  return {
    stagedRoute,
    setField,
    isLoading,
    onSubmit,
  };
};
