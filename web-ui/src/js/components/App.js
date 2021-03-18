'use es6';

import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Directions from './Directions';
import Map from './Map';

const App = () => (
  <div className="App vh-100">
    <Router>
      <Route path="/map">
        <Map />
      </Route>
      <Route path="/test-api">
        <Directions />
      </Route>
    </Router>
  </div>
);
App.displayName = 'App';

export default App;
