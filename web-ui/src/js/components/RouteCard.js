'use es6';

import React from 'react';
import { Card } from 'react-bootstrap';
import { deleteRoute } from '../data/routes';
import { useRouteCard } from '../hooks/useRouteCard';

const RouteCard = ({ token, id, name, description, distance, user }) => {
  const { dispatch, formattedDistance } = useRouteCard(distance);
  return (
    <Card className="m-4">
      <div className="m-4">
        <Card.Title>
          {name} <small className="font-italic">{formattedDistance}</small>
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Created by: {user.name}
        </Card.Subtitle>
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
RouteCard.displayName = 'RouteCard';

export default RouteCard;
