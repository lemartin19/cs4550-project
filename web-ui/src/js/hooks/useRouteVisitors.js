'use es6';

import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getCurrentUserId, getSocket } from '../data/login';
import {
  getChannel,
  getVisitors,
  joinVisitorChannel,
  leaveVisitorChannel,
  visitRoute,
} from '../data/visitors';

export const useRouteVisitors = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const socket = useSelector(getSocket);
  const channel = useSelector(getChannel);
  const visitors = useSelector(getVisitors);
  const currentUserId = useSelector(getCurrentUserId);

  useEffect(() => {
    const channel = joinVisitorChannel(dispatch, id, socket);
    return () => leaveVisitorChannel(dispatch, channel);
  }, [dispatch, id, socket]);

  const isOnRoute = visitors
    .map((visitor) => visitor.id)
    .includes(currentUserId);

  const onClick = useCallback(() => visitRoute(channel), [channel]);

  return { isOnRoute, onClick };
};
