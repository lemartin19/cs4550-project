'use es6';

import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { createComment } from '../data/comments';
import { getSessionToken } from '../data/login';

export const useNewComment = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [comment, setComment] = useState({ body: '', error: null });
  const token = useSelector(getSessionToken);

  const setField = useCallback((field, value) =>
    setComment({ ...comment, [field]: value })
  );

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      setIsLoading(true);

      createComment({ ...comment, route_id: id }, token)
        .then((action) => {
          dispatch(action);
          setShowForm(false);
          setIsLoading(false);
          setComment({ body: '', error: null });
        })
        .catch(({ message }) => {
          setIsLoading(false);
          setField('error', message);
        });
    },
    [dispatch, id, comment, token]
  );

  const toggleShowForm = useCallback(() => setShowForm(!showForm), [showForm]);

  return { showForm, toggleShowForm, onSubmit, comment, setField, isLoading };
};
