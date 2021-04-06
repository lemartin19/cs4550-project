'use es6';

import { createReducer } from '@reduxjs/toolkit';

const IS_METRIC = 'IS_METRIC';

export const toggleIsMetric = () => ({ type: IS_METRIC });

export const filtersReducer = createReducer(
  { isMetric: false },
  {
    [IS_METRIC]: (state) => Object.assign(state, { isMetric: !state.isMetric }),
  }
);

export const isFilterMetric = (state) => state.filters.isMetric;
