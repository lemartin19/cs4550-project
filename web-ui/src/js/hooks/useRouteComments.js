'use es6';

import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { deleteComment, fetchComments, getComments } from '../data/comments';
import { getCurrentUserId, getSessionToken } from '../data/login';
import { getRouteOwnerId } from '../data/routes';

export const useRouteComments = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const token = useSelector(getSessionToken);
  const comments = useSelector((state) => getComments(state, id));
  const currentUserId = useSelector(getCurrentUserId);
  const routeOwnerId = useSelector((state) => getRouteOwnerId(state, id));

  useEffect(() => {
    if (comments) return;

    fetchComments(id, token).then(dispatch);
  }, [dispatch, comments, id, token]);

  const onDelete = useCallback((id) => deleteComment(id, token).then(dispatch));
  const ownsRouteOrComment = useCallback(
    (commentOwnerId) =>
      currentUserId === commentOwnerId || currentUserId === routeOwnerId,
    [currentUserId, routeOwnerId]
  );

  return { comments, onDelete, ownsRouteOrComment };
};
