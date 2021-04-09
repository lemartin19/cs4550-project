'use es6';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { fetchComments, getComments } from '../data/comments';
import { getSessionToken } from '../data/login';

export const useRouteComments = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const token = useSelector(getSessionToken);
  const comments = useSelector((state) => getComments(state, id));

  useEffect(() => {
    if (comments) return;

    fetchComments(id, token).then(dispatch);
  }, [dispatch, comments, id, token]);

  return { comments };
};
