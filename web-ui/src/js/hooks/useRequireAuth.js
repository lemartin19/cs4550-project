'use es6';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { LOCAL_STORAGE_REDIRECT } from '../config';
import { getSessionToken } from '../data/login';

export const useRequireAuth = (currentRoute) => {
  const history = useHistory();
  const token = useSelector(getSessionToken);

  useEffect(() => {
    if (!token) {
      try {
        localStorage.setItem(LOCAL_STORAGE_REDIRECT, currentRoute);
        history.push(`/login?error=unauthorized`);
      } catch (error) {
        history.push(`/login?error=unauthorized`);
      }
    }
  }, [token]);
};
