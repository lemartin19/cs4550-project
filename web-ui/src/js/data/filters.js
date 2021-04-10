'use es6';

import { createReducer } from '@reduxjs/toolkit';

const IS_METRIC = 'IS_METRIC';
const SET_OWNER_FILTER = 'SET_OWNER_FILTER';

export const toggleIsMetric = () => ({ type: IS_METRIC });

export const setOwnerFilter = (ownerFilter) => ({
  type: SET_OWNER_FILTER,
  payload: ownerFilter,
});

export const filtersReducer = createReducer(
  { isMetric: false, owner: '' },
  {
    [IS_METRIC]: (state) => ({ ...state, isMetric: !state.isMetric }),
    [SET_OWNER_FILTER]: (state, { payload }) => ({ ...state, owner: payload }),
  }
);

export const isFilterMetric = (state) => state.filters.isMetric;
export const getOwnerFilter = (state) => state.filters.owner;
