'use es6';

import React from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import Nav from './Nav';
import { useRouteFeed } from '../hooks/useRouteFeed';

const Route = ({ name, description, user }) => (
  <Card className="m-4 p-4">
    <Card.Title>{name}</Card.Title>
    <Card.Subtitle className="mb-2 text-muted">{user.name}</Card.Subtitle>
    <Card.Text>{description}</Card.Text>
  </Card>
);
Route.displayName = 'Route';

const RouteFeed = () => {
  const { routes } = useRouteFeed();
  return (
    <Container>
      <Nav />
      <h1>Route Feed</h1>
      <Button variant="primary" size="small" href="/new">
        New route
      </Button>
      <div className="my-4">
        {routes.length
          ? routes.map((route) => <Route {...route} key={route.name} />)
          : 'No routes to view'}
      </div>
    </Container>
  );
};
RouteFeed.displayName = 'RouteFeed';

export default RouteFeed;
