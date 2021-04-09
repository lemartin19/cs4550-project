'use es6';

import { combineReducers, createStore } from 'redux';
import { filtersReducer } from './filters';
import { routesReducer } from './routes';
import { loginReducer } from './login';
import { channelReducer } from './visitors';
import { commentsReducer } from './comments';

const rootReducer = combineReducers({
  channel: channelReducer,
  comments: commentsReducer,
  filters: filtersReducer,
  routes: routesReducer,
  login: loginReducer,
});

export default createStore(rootReducer);
