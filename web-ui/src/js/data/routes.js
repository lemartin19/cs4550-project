'use es6';

import { createReducer } from '@reduxjs/toolkit';
import { apiFetch } from './api';

const FETCH_ROUTE = 'FETCH_ROUTE';
const CREATE_ROUTE = 'CREATE_ROUTE';
const ADD_MARKER = 'ADD_MARKER';

export const fetchRoute = (id) => apiFetch(`/routes/${id}`, FETCH_ROUTE);

export const postMarker = (points, token) =>
  apiFetch({
    path: `/routes/add_marker`,
    type: ADD_MARKER,
    method: 'POST',
    token,
    requestArgs: { points },
  });

export const createRoute = ({ name, description, points, json }, token) =>
  apiFetch({
    path: `/routes`,
    type: CREATE_ROUTE,
    method: 'POST',
    token,
    requestArgs: { name, description, points, json },
  });

export const routesReducer = createReducer(
  { staged: {} },
  {
    [FETCH_ROUTE]: (state, { payload }) => {
      return Object.assign({}, state, { [payload.id]: payload });
    },
    [ADD_MARKER]: (state, { requestArgs, payload }) => {
      const staged = Object.assign({}, state.staged, requestArgs, payload);
      return Object.assign({}, state, { staged });
    },
  }
);

export const getRoutes = (state) => state.routes;
export const getStagedRoute = (state) => state.routes.staged;
export const getRoute = (state, id) => state.routes[id];
