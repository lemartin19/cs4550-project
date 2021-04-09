'use es6';

import { createReducer } from '@reduxjs/toolkit';
import { apiFetch } from './api';

const FETCH_COMMENTS = 'FETCH_COMMENTS';
const CREATE_COMMENT = 'CREATE_COMMENT';
const DELETE_COMMENT = 'DELETE_COMMENT';

export const fetchComments = (route_id, token) =>
  apiFetch({
    path: `/comments?route_id=${route_id}`,
    type: FETCH_COMMENTS,
    token,
  }).then((action) => ({ ...action, requestArgs: { route_id } }));

export const createComment = ({ route_id, body, location }, token) =>
  apiFetch({
    path: `/comments?route_id=${route_id}`,
    type: CREATE_COMMENT,
    token,
    method: 'POST',
    requestArgs: { route_id, body, location },
  });

export const deleteComment = (id, token) =>
  apiFetch({
    path: `/comments/${id}`,
    type: DELETE_COMMENT,
    token,
    method: 'DELETE',
    requestArgs: { id },
  });

export const commentsReducer = createReducer(
  {},
  {
    [FETCH_COMMENTS]: (state, { payload, requestArgs }) => {
      return {
        ...state,
        [requestArgs.route_id]: Object.values(payload),
      };
    },
    [CREATE_COMMENT]: (state, { payload, requestArgs }) => {
      const route = [...state[requestArgs.route_id], payload];
      return {
        ...state,
        [requestArgs.route_id]: route,
      };
    },
    [DELETE_COMMENT]: (state, { requestArgs }) => {
      const newState = {};
      Object.keys(state).forEach((id) => {
        newState[id] = state[id].filter(
          (comment) => comment.id !== requestArgs.id
        );
      });
      return newState;
    },
  }
);

export const getComments = (state, routeId) => state.comments[routeId];
