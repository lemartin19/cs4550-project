'use es6';

import { createReducer } from '@reduxjs/toolkit';
import { apiFetch } from './api';

const FETCH_USERS = 'FETCH_USERS';
const FETCH_USER = 'FETCH_USER';
export const CREATE_USER = 'CREATE_USER';

export const fetchUsers = () => apiFetch(`/users`, FETCH_USERS);

export const fetchUser = (id) => apiFetch(`/users/${id}`, FETCH_USER);

export const createUser = (username, email, password) =>
  apiFetch({
    path: `/users`,
    type: CREATE_USER,
    method: 'POST',
    body: JSON.stringify({ name: username, email, password }),
  });

export const userReducer = createReducer(
  { data: {}, isLoaded: false },
  {
    [FETCH_USERS]: (state, { payload }) => {
      const users = {};
      payload.forEach((user) => {
        users[user.id] = user;
      });
      return { data: users, isLoaded: true };
    },
    [FETCH_USER]: ({ data, isLoaded }, { payload }) => ({
      data: Object.assign({}, data, { [payload.id]: payload }),
      isLoaded,
    }),
    [CREATE_USER]: ({ data, isLoaded }, { payload }) => ({
      data: Object.assign({}, data, { [payload.id]: payload }),
      isLoaded,
    }),
  }
);

export const getUsers = (state) => state.users.data;
export const getUsersAreLoaded = (state) => state.users.isLoaded;
export const getUser = (state, id) => (id ? state.users.data[id] : null);
