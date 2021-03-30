'use es6';

import { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { LOCAL_STORAGE_REDIRECT } from '../config';
import { postLogin } from '../data/session';
import { useQueryParams } from './useQueryParams';

export const useLogin = () => {
  const [login, setLogin] = useState({ email: '', password: '', error: null });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { error } = useQueryParams();

  const setField = useCallback((field, value) => {
    setLogin((state) => Object.assign({}, state, { [field]: value }));
  }, []);

  useEffect(() => {
    if (error === 'unauthorized') {
      setField('error', 'You must be logged in to do that.');
    }
  }, [error]);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      setIsLoading(true);
      postLogin(login.email, login.password)
        .then(dispatch)
        .then(() => {
          setIsLoading(false);
          try {
            const redirect = localStorage.getItem(LOCAL_STORAGE_REDIRECT);
            history.push(redirect || '/');
          } catch (error) {
            history.push('/');
          }
        })
        .catch(({ message }) => {
          setIsLoading(false);
          setField('error', message);
        });
    },
    [login.email, login.password, dispatch, history]
  );

  return { login, setField, onSubmit, isLoading };
};
