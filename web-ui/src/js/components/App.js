'use es6';

import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './Login';
import Map from './Map';
import RouteFeed from './RouteFeed';

const App = () => (
  <div className="App vh-100">
    <Router>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/map">
        <Map />
      </Route>
      <Route path="/">
        <RouteFeed />
      </Route>
    </Router>
  </div>
);
App.displayName = 'App';

export default App;
