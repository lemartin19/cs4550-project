'use es6';

import { createReducer } from '@reduxjs/toolkit';
import { apiFetch } from './api';

const FETCH_ROUTE = 'FETCH_ROUTE';
const ADD_MARKER = 'ADD_MARKER';

export const fetchRoute = () => apiFetch(`/routes/1`, FETCH_ROUTE);

export const postMarker = (points) =>
  apiFetch(
    `/routes/1/add_marker`,
    ADD_MARKER,
    'POST',
    JSON.stringify({ points })
  );

export const routeReducer = createReducer(
  {},
  {
    [FETCH_ROUTE]: (state, { payload }) => {
      return payload;
    },
    [ADD_MARKER]: () => {
      return null;
    },
  }
);

export const getRoutes = (state) => state.routes;
