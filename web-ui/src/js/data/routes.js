'use es6';

import { createReducer } from '@reduxjs/toolkit';
import { apiFetch } from './api';

const FETCH_ROUTE = 'FETCH_ROUTE';
const FETCH_ROUTES = 'FETCH_ROUTES';
const CREATE_ROUTE = 'CREATE_ROUTE';
const UPDATE_ROUTE = 'UPDATE_ROUTE';
const DELETE_ROUTE = 'DELETE_ROUTE';
const UPDATE_STAGED = 'UPDATE_STAGED';
const ADD_MARKER = 'ADD_MARKER';

export const updateStagedRoute = (newStaged) => ({
  type: UPDATE_STAGED,
  payload: newStaged,
});

export const fetchRoute = (id, token) =>
  apiFetch({ path: `/routes/${id}`, type: FETCH_ROUTE, token });

export const fetchRoutes = (token) =>
  apiFetch({ path: `/routes`, type: FETCH_ROUTES, token });

const createRoute = ({ name, description, distance, points }, token) =>
  apiFetch({
    path: `/routes`,
    type: CREATE_ROUTE,
    method: 'POST',
    token,
    requestArgs: { name, description, distance, points },
  });

const updateRoute = ({ id, name, description, distance, points }, token) =>
  apiFetch({
    path: `/routes/${id}`,
    type: UPDATE_ROUTE,
    method: 'PUT',
    token,
    requestArgs: { name, description, distance, points },
  });

export const saveRoute = (routeArgs, token) =>
  routeArgs.id ? updateRoute(routeArgs, token) : createRoute(routeArgs, token);

export const deleteRoute = (id, token) =>
  apiFetch({
    path: `/routes/${id}`,
    type: DELETE_ROUTE,
    method: 'DELETE',
    token,
    requestArgs: { id },
  });

export const postMarker = (points, token) =>
  apiFetch({
    path: `/routes/add_marker`,
    type: ADD_MARKER,
    method: 'POST',
    token,
    requestArgs: { points },
  });

export const routesReducer = createReducer(
  { staged: {}, saved: {}, isLoaded: false },
  {
    [UPDATE_STAGED]: ({ staged, saved, isLoaded }, { payload }) => ({
      staged: Object.assign({}, staged, payload),
      saved,
      isLoaded,
    }),
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
    [CREATE_ROUTE]: (state, { payload }) => {
      const newSaved = Object.assign({}, state.saved, {
        [payload.id]: payload,
      });
      return Object.assign({}, state, { saved: newSaved });
    },
    [UPDATE_ROUTE]: (state, { payload }) => {
      const newSaved = Object.assign({}, state.saved, {
        [payload.id]: payload,
      });
      return Object.assign({}, state, { saved: newSaved });
    },
    [DELETE_ROUTE]: (state, { requestArgs }) => {
      const newSaved = {};
      Object.keys(state.saved).forEach((id) => {
        if (id === `${requestArgs.id}`) return;
        newSaved[id] = state.saved[id];
      });
      return Object.assign({}, state, { saved: newSaved });
    },
    [ADD_MARKER]: (state, { requestArgs, payload }) => {
      const distance = payload.directions.reduce(
        (totalDistance, direction) =>
          direction.legs.reduce(
            (accDistance, leg) => accDistance + leg.distance.value,
            totalDistance
          ),
        0
      );
      const staged = Object.assign({}, state.staged, requestArgs, payload, {
        distance,
      });
      return Object.assign({}, state, { staged });
    },
  }
);

export const getRoutesAreLoaded = (state) => state.routes.isLoaded;
export const getRoutes = (state) => state.routes.saved;
export const getStagedRoute = (state) => state.routes.staged;
export const getRoute = (state, id) => state.routes.saved[id];
