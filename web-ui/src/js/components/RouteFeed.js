'use es6';

import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Card, Container } from 'react-bootstrap';
import Nav from './Nav';
import { useRouteFeed } from '../hooks/useRouteFeed';
import { deleteRoute } from '../data/routes';

const Route = ({ token, id, name, description, user }) => {
  const dispatch = useDispatch();
  return (
    <Card className="m-4">
      <div className="m-4">
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{user.name}</Card.Subtitle>
        <Card.Text>{description}</Card.Text>
      </div>
      <Card.Footer>
        <Card.Link href={`/routes/${id}`}>Show</Card.Link>
        <Card.Link href={`/routes/${id}/edit`}>Edit</Card.Link>
        <Card.Link onClick={() => deleteRoute(id, token).then(dispatch)}>
          Delete
        </Card.Link>
      </Card.Footer>
    </Card>
  );
};
Route.displayName = 'Route';

const RouteFeed = () => {
  const { token, routes } = useRouteFeed();
  return (
    <Container>
      <Nav />
      <h1>Route Feed</h1>
      <Button variant="primary" size="small" href="/new">
        New route
      </Button>
      <div className="my-4">
        {routes.length
          ? routes.map((route) => (
              <Route token={token} {...route} key={route.id} />
            ))
          : 'No routes to view'}
      </div>
    </Container>
  );
};
RouteFeed.displayName = 'RouteFeed';

export default RouteFeed;
