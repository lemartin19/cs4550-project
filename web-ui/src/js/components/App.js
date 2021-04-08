'use es6';

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import EditRoute from './EditRoute';
import Login from './Login';
import Map from './Map';
import Register from './Register';
import RouteDetails from './RouteDetails';
import RouteFeed from './RouteFeed';

const App = () => (
  <div className="App vh-100">
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/new">
          <Map />
        </Route>
        <Route path="/routes/:id/edit">
          <EditRoute />
        </Route>
        <Route path="/routes/:id">
          <RouteDetails />
        </Route>
        <Route path="/">
          <RouteFeed />
        </Route>
      </Switch>
    </Router>
  </div>
);
App.displayName = 'App';

export default App;
