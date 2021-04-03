'use es6';

import { createReducer } from '@reduxjs/toolkit';
import { apiFetch } from './api';

const FETCH_ROUTE = 'FETCH_ROUTE';
const ADD_MARKER = 'ADD_MARKER';

export const fetchRoute = (id) => apiFetch(`/routes/${id}`, FETCH_ROUTE);

export const postMarker = (points, token) =>
  apiFetch({
    path: `/routes/add_marker`,
    type: ADD_MARKER,
    method: 'POST',
    token,
    body: JSON.stringify({ points }),
  });

export const routesReducer = createReducer(
  {},
  {
    [FETCH_ROUTE]: (state, { payload }) => {
      return Object.assign({}, state, { [payload.id]: payload });
    },
    [ADD_MARKER]: () => {
      return null;
    },
  }
);

export const getRoutes = (state) => state.routes;
