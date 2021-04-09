'use es6';

import React from 'react';
import { Button } from 'react-bootstrap';
import { useRouteVisitors } from '../hooks/useRouteVisitors';
import CurrentVisitors from './CurrentVisitors';

const RouteVisitors = () => {
  const { onClick, isOnRoute } = useRouteVisitors();
  return (
    <div className="d-flex align-items-center mt-4">
      <Button variant="primary" onClick={onClick} className="mr-2">
        {isOnRoute ? "I'm not on this route" : 'Find me on this route!'}
      </Button>
      <CurrentVisitors />
    </div>
  );
};
RouteVisitors.displayName = 'RouteVisitors';

export default RouteVisitors;
