'use es6';

import { createReducer } from '@reduxjs/toolkit';

const IS_METRIC = 'IS_METRIC';
const SET_OWNER_FILTER = 'SET_OWNER_FILTER';
const SET_DISTANCE_FILTER = 'SET_DISTANCE_FILTER';

export const toggleIsMetric = () => ({ type: IS_METRIC });

export const setOwnerFilter = (ownerFilter) => ({
  type: SET_OWNER_FILTER,
  payload: ownerFilter,
});

export const setDistanceFilter = (distanceFilter) => ({
  type: SET_DISTANCE_FILTER,
  payload: distanceFilter,
});

export const filtersReducer = createReducer(
  {
    isMetric: false,
    owner: '',
    distance: [],
  },
  {
    [IS_METRIC]: (state) => ({ ...state, isMetric: !state.isMetric }),
    [SET_OWNER_FILTER]: (state, { payload }) => ({ ...state, owner: payload }),
    [SET_DISTANCE_FILTER]: (state, { payload }) => {
      const distanceFilters = [...payload].map((option) => {
        const [min, max] = option.value
          .split('-')
          .map((num) => (num === 'X' ? Number.MAX_SAFE_INTEGER : Number(num)));
        return { min, max };
      });
      return { ...state, distance: distanceFilters };
    },
  }
);

export const isFilterMetric = (state) => state.filters.isMetric;
export const getOwnerFilter = (state) => state.filters.owner;
export const getDistanceFilter = (state) => state.filters.distance;
