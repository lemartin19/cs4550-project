'use es6';

import { createReducer } from '@reduxjs/toolkit';
import { apiFetch } from './api';

const FETCH_COMMENTS = 'FETCH_COMMENTS';
const CREATE_COMMENT = 'CREATE_COMMENT';

export const fetchComments = (route_id, token) =>
  apiFetch({
    path: `/comments?route_id=${route_id}`,
    type: FETCH_COMMENTS,
    token,
  }).then((action) => ({ ...action, requestArgs: { route_id } }));

export const createComment = ({ route_id, body, location }, token) =>
  apiFetch({
    path: `/comments?route_id=${route_id}`,
    type: FETCH_COMMENTS,
    token,
    method: 'POST',
    requestArgs: { route_id, body, location },
  });

export const commentsReducer = createReducer(
  {},
  {
    [FETCH_COMMENTS]: (state, { payload, requestArgs }) => ({
      ...state,
      [requestArgs.route_id]: Object.values(payload),
    }),
    [CREATE_COMMENT]: (state, { payload, requestArgs }) => {
      const route = [...state[requestArgs.route_id], payload];
      return {
        ...state,
        [requestArgs.route_id]: route,
      };
    },
  }
);

export const getComments = (state, routeId) => state.comments[routeId];
