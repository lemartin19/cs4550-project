'use es6';

import React from 'react';
import { useMap } from '../hooks/useMap';

const Map = () => {
  useMap();

  return (
    <div className="d-flex flex-row">
      <div id="Map" className="vh-100 vw-100"></div>
    </div>
  );
};
Map.displayName = 'Map';

export default Map;
