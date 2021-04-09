'use es6';

import React from 'react';
import CurrentVisitors from './CurrentVisitors';

const RouteVisitors = () => {
  const { onClick, isOnRoute };
  return (
    <div>
      <CurrentVisitors />
      <Button variant="primary" onClick={onClick}>
        {isOnRoute ? "I'm not on this route" : 'Find me on this route!'}
      </Button>
    </div>
  );
};
RouteVisitors.displayName = 'RouteVisitors';

export default RouteVisitors;
