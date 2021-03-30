'use es6';

import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createUser } from '../data/users';
import { useQueryParams } from './useQueryParams';

const calculatePasswordErrors = (password1, password2) => {
  if (password1.length < 8)
    return 'Password must be at least 8 characters long.';
  if (password2 !== password1) return 'Passwords do not match.';

  return null;
};

export const useRegister = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password1: '',
    password2: '',
    error: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { redirect } = useQueryParams();
  const history = useHistory();

  const setField = useCallback(
    (field, value) =>
      setUser((user) => Object.assign({}, user, { [field]: value })),
    []
  );

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();

      const passwordError = calculatePasswordErrors(
        user.password1,
        user.password2
      );
      if (passwordError) {
        setField('error', passwordError);
        return;
      }

      setIsLoading(true);
      createUser(user.username, user.email, user.password1)
        .then(dispatch)
        .then(() => {
          history.push(redirect || '/');
          setIsLoading(false);
        })
        .catch(({ message }) => {
          setField('error', message);
          setIsLoading(false);
        });
    },
    [user, setField, dispatch, redirect]
  );

  return {
    user,
    setField,
    onSubmit,
    isLoading,
  };
};
