'use es6';

import React from 'react';
import { Card } from 'react-bootstrap';
import { useRouteCard } from '../hooks/useRouteCard';

const RouteCard = ({ id, name, description, distance, user }) => {
  const { formattedDistance, currentUserId, onDelete } = useRouteCard(
    id,
    distance
  );
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
        {currentUserId === user.id ? (
          <React.Fragment>
            <Card.Link href={`/routes/${id}/edit`}>Edit</Card.Link>
            <Card.Link onClick={onDelete}>Delete</Card.Link>
          </React.Fragment>
        ) : null}
      </Card.Footer>
    </Card>
  );
};
RouteCard.displayName = 'RouteCard';

export default RouteCard;
