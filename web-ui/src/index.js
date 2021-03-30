'use es6';

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './js/components/App';
import store from './js/data/store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
