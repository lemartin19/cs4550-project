'use es6';

import { createReducer } from '@reduxjs/toolkit';
import { apiFetch } from './api';

const FETCH_ROUTE = 'FETCH_ROUTE';
const FETCH_ROUTES = 'FETCH_ROUTES';
const CREATE_ROUTE = 'CREATE_ROUTE';
const UPDATE_ROUTE = 'UPDATE_ROUTE';
const DELETE_ROUTE = 'DELETE_ROUTE';
const UPDATE_STAGED = 'UPDATE_STAGED';
const SET_MARKERS = 'SET_MARKERS';

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

export const setMarkers = (points, token) =>
  apiFetch({
    path: `/routes/set_points`,
    type: SET_MARKERS,
    method: 'POST',
    token,
    requestArgs: { points },
  });

export const routesReducer = createReducer(
  { staged: {}, saved: {}, isLoaded: false },
  {
    [UPDATE_STAGED]: ({ staged, saved, isLoaded }, { payload }) => ({
      staged: { ...staged, ...payload },
      saved,
      isLoaded,
    }),
    [FETCH_ROUTE]: (state, { payload }) => {
      const newSaved = { ...state.saved, [payload.id]: payload };
      return { ...state, saved: newSaved };
    },
    [FETCH_ROUTES]: (state, { payload }) => {
      const newState = { staged: state.staged, saved: {}, isLoaded: true };
      payload.forEach((route) => {
        newState.saved[route.id] = route;
      });
      return newState;
    },
    [CREATE_ROUTE]: (state, { payload }) => {
      const newSaved = { ...state.saved, [payload.id]: payload };
      return { ...state, saved: newSaved };
    },
    [UPDATE_ROUTE]: (state, { payload }) => {
      const newSaved = { ...state.saved, [payload.id]: payload };
      return { ...state, saved: newSaved };
    },
    [DELETE_ROUTE]: (state, { requestArgs }) => {
      const newSaved = {};
      Object.keys(state.saved).forEach((id) => {
        if (id === `${requestArgs.id}`) return;
        newSaved[id] = state.saved[id];
      });
      return { ...state, saved: newSaved };
    },
    [SET_MARKERS]: (state, { requestArgs, payload }) => {
      const distance = payload.directions.reduce(
        (totalDistance, direction) =>
          direction.legs.reduce(
            (accDistance, leg) => accDistance + leg.distance.value,
            totalDistance
          ),
        0
      );
      const staged = { ...state.staged, ...requestArgs, ...payload, distance };
      return { ...state, staged };
    },
  }
);

export const getRoutesAreLoaded = (state) => state.routes.isLoaded;
export const getRoutes = (state) => state.routes.saved;
export const getStagedRoute = (state) => state.routes.staged;
export const getRoute = (state, id) => state.routes.saved[id];
export const getRouteOwnerId = (state, id) =>
  state.routes.saved[id] && state.routes.saved[id].user.id;
