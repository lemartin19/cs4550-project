'use es6';

import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getCurrentUserName, postLogout } from '../data/session';

export const useNav = () => {
  const history = useHistory();
  const name = useSelector(getCurrentUserName);

  const dispatch = useDispatch();
  const handleLogout = useCallback(() => {
    dispatch(postLogout());
    history.push('/login');
  }, [dispatch]);
  return { name, handleLogout };
};
