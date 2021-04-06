'use es6';

import React from 'react';
import { Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useRouteDetails } from '../hooks/useRouteDetails';
import Nav from './Nav';

const RouteDetails = () => {
  const { route, formattedDistance, toggleIsMetric } = useRouteDetails();
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
      <div className="my-4">{route.description}</div>
      <Link href={`/routes/${route.id}/edit`}>Edit</Link>
    </Container>
  ) : null;
};
RouteDetails.displayName = 'RouteDetails';

export default RouteDetails;
