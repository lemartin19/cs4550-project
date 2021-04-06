'use es6';

import { createReducer } from '@reduxjs/toolkit';
import { apiFetch } from './api';

const FETCH_ROUTE = 'FETCH_ROUTE';
const FETCH_ROUTES = 'FETCH_ROUTES';
const CREATE_ROUTE = 'CREATE_ROUTE';
const ADD_MARKER = 'ADD_MARKER';

export const fetchRoute = (id, token) =>
  apiFetch({ path: `/routes/${id}`, type: FETCH_ROUTE, token });

export const fetchRoutes = (token) =>
  apiFetch({ path: `/routes`, type: FETCH_ROUTES, token });

export const postMarker = (points, token) =>
  apiFetch({
    path: `/routes/add_marker`,
    type: ADD_MARKER,
    method: 'POST',
    token,
    requestArgs: { points },
  });

export const createRoute = ({ name, description, points }, token) =>
  apiFetch({
    path: `/routes`,
    type: CREATE_ROUTE,
    method: 'POST',
    token,
    requestArgs: { name, description, points },
  });

export const routesReducer = createReducer(
  { staged: {}, saved: {}, isLoaded: false },
  {
    [FETCH_ROUTE]: (state, { payload }) => {
      const newSaved = Object.assign({}, state.saved, {
        [payload.id]: payload,
      });
      return Object.assign({}, state, { saved: newSaved });
    },
    [FETCH_ROUTES]: (state, { payload }) => {
      const newState = { staged: state.staged, saved: {}, isLoaded: true };
      payload.forEach((route) => {
        newState.saved[route.id] = route;
      });
      return newState;
    },
    [ADD_MARKER]: (state, { requestArgs, payload }) => {
      const staged = Object.assign({}, state.staged, requestArgs, payload);
      return Object.assign({}, state, { staged });
    },
  }
);

export const getRoutesAreLoaded = (state) => state.routes.isLoaded;
export const getRoutes = (state) => state.routes.saved;
export const getStagedRoute = (state) => state.routes.staged;
export const getRoute = (state, id) => state.routes.saved[id];
