'use es6';

import React from 'react';
import { Container } from 'react-bootstrap';
import Nav from './Nav';

const RouteFeed = () => {
  return (
    <Container>
      <Nav />
      Route feed
    </Container>
  );
};
RouteFeed.displayName = 'RouteFeed';

export default RouteFeed;
