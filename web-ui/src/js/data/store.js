'use es6';

import { combineReducers, createStore } from 'redux';
import { filtersReducer } from './filters';
import { routesReducer } from './routes';
import { sessionReducer } from './login';

const rootReducer = combineReducers({
  filters: filtersReducer,
  routes: routesReducer,
  session: sessionReducer,
});

export default createStore(rootReducer);
