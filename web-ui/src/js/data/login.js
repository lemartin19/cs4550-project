'use es6';

import { createReducer } from '@reduxjs/toolkit';
import { LOCAL_STORAGE_SESSION_KEY } from '../constants/config';
import { apiFetch } from './api';
import { CREATE_USER } from './users';

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

export const postLogin = (email, password) =>
  apiFetch(`/session`, LOGIN, 'POST', JSON.stringify({ email, password }));

export const postLogout = () => ({ type: LOGOUT });

const saveSession = (session) => {
  const sessionWithTime = Object.assign({}, session, { time: Date.now() });
  try {
    localStorage.setItem(
      LOCAL_STORAGE_SESSION_KEY,
      JSON.stringify(sessionWithTime)
    );
  } catch (error) {
    console.log('local storage disabled - could not save session');
  }
};

const loadSession = () => {
  let sessionJson;
  try {
    sessionJson = localStorage.getItem(LOCAL_STORAGE_SESSION_KEY);
  } catch (error) {
    console.log('local storage disabled - could not load session');
  }
  if (!sessionJson) return null;

  const session = JSON.parse(sessionJson);
  const age = Date.now() - session.time;
  const hours = 60 * 60 * 1000;

  return age < 24 * hours ? session : null;
};

export const sessionReducer = createReducer(loadSession(), {
  [LOGIN]: (state, { payload }) => {
    saveSession(payload);
    return payload;
  },
  [LOGOUT]: () => {
    saveSession(null);
    return null;
  },
  [CREATE_USER]: (state, { payload }) => {
    saveSession(payload);
    return payload;
  },
});

export const getSession = (state) => state.session;
export const getCurrentUserName = (state) =>
  state.session && state.session.name;
export const getSessionToken = (state) => state.session && state.session.token;
