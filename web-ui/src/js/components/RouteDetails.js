'use es6';

import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useRouteDetails } from '../hooks/useRouteDetails';
import Nav from './Nav';
import RouteComments from './RouteComments';
import RouteVisitors from './RouteVisitors';

const RouteDetails = () => {
  const {
    route,
    isOwner,
    formattedDistance,
    toggleIsMetric,
    onDelete,
  } = useRouteDetails();
  return route ? (
    <Container>
      <Nav />
      <h2>{route.name}</h2>
      <h5>Created by: {route.user.name}</h5>
      <div className="d-flex my-4">
        Route Length: {formattedDistance}
        <Form className="ml-4" inline>
          <Form.Check
            type="switch"
            id="units"
            label="Imperial / Metric"
            onClick={toggleIsMetric}
          ></Form.Check>
        </Form>
      </div>
      <div className="my-2">{route.description}</div>
      {isOwner ? (
        <div className="d-flex align-items-center">
          <Link to={`/routes/${route.id}/edit`}>Edit</Link>
          <Button variant="link" onClick={onDelete}>
            Delete
          </Button>
        </div>
      ) : null}
      <RouteVisitors />
      <RouteComments />
    </Container>
  ) : null;
};
RouteDetails.displayName = 'RouteDetails';

export default RouteDetails;
