'use es6';

import { combineReducers, createStore } from 'redux';
import { routesReducer } from './routes';
import { sessionReducer } from './login';

const rootReducer = combineReducers({
  routes: routesReducer,
  session: sessionReducer,
});

export default createStore(rootReducer);
