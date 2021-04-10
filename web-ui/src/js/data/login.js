'use es6';

import { Socket } from 'phoenix';
import { createReducer } from '@reduxjs/toolkit';
import { isQa, LOCAL_STORAGE_SESSION_KEY } from '../constants/config';
import { apiFetch } from './api';
import { CREATE_USER } from './users';

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

export const postLogin = (email, password) =>
  apiFetch({
    path: `/session`,
    type: LOGIN,
    method: 'POST',
    requestArgs: { email, password },
  });

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

const buildSocket = ({ token }) => {
  const socket = new Socket(
    `wss://project-api${isQa() ? '.qa' : ''}.seablue.site/socket`,
    {
      params: { token },
    }
  );
  socket.connect();
  return socket;
};

const loadSession = () => {
  let sessionJson;
  try {
    sessionJson = localStorage.getItem(LOCAL_STORAGE_SESSION_KEY);
  } catch (error) {
    console.log('local storage disabled - could not load session');
  }
  if (!sessionJson) return { socket: null, session: null };

  const session = JSON.parse(sessionJson);
  const age = Date.now() - session.time;
  const hours = 60 * 60 * 1000;

  return age < 24 * hours
    ? { socket: buildSocket(session), session }
    : { socket: null, session: null };
};

export const loginReducer = createReducer(loadSession(), {
  [LOGIN]: (state, { payload }) => {
    saveSession(payload);
    return { socket: buildSocket(payload), session: payload };
  },
  [LOGOUT]: ({ socket }) => {
    saveSession(null);
    socket.channel('logout').join();
    return { socket: null, session: null };
  },
  [CREATE_USER]: (state, { payload }) => {
    saveSession(payload);
    return { socket: buildSocket(payload), session: payload };
  },
});

export const getSession = (state) => state.login;
export const getCurrentUserId = (state) =>
  state.login.session && state.login.session.id;
export const getCurrentUserName = (state) =>
  state.login.session && state.login.session.name;
export const getSessionToken = (state) =>
  state.login.session && state.login.session.token;
export const getSocket = (state) => state.login.socket;
