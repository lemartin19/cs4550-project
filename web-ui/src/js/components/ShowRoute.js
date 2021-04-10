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
    polyline,
  } = useRouteDetails();
  return route ? (
    <div className="d-flex justify-content-between">
      <div>
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
      </div>
      <img
        alt="route map"
        src={`https://maps.googleapis.com/maps/api/staticmap?size=400x400&path=enc:${polyline}&key=AIzaSyDcWLVRXekKWJvAmya5UhgeQKK-MZHvK1o`}
        className="m-4"
      />
    </div>
  ) : null;
};
RouteDetails.displayName = 'RouteDetails';

const ShowRoute = () => (
  <Container>
    <Nav />
    <RouteDetails />
    <RouteVisitors />
    <RouteComments />
  </Container>
);
ShowRoute.displayName = 'ShowRoute';

export default ShowRoute;
