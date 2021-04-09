'use es6';

import React from 'react';
import { Button, Container } from 'react-bootstrap';
import Nav from './Nav';
import RouteCard from './RouteCard';
import FeedFilters from './FeedFilters';
import { useRouteFeed } from '../hooks/useRouteFeed';

const RouteFeed = () => {
  const { token, routes } = useRouteFeed();
  return (
    <Container>
      <Nav />
      <h1>Route Feed</h1>
      <Button variant="primary" href="/new" className="mt-2">
        New route
      </Button>
      <FeedFilters />
      <div className="my-4">
        {routes.length
          ? routes.map((route) => (
              <RouteCard token={token} {...route} key={route.id} />
            ))
          : 'No routes to view'}
      </div>
    </Container>
  );
};
RouteFeed.displayName = 'RouteFeed';

export default RouteFeed;
