'use es6';

import React, { useEffect, useState } from 'react';
import { fetchRoute } from '../data/routes';

const Directions = () => {
  const [response, setResponse] = useState('');

  useEffect(() => {
    fetchRoute().then(setResponse);
  }, []);

  return <div className="m-4">response: {response}</div>;
};
Directions.displayName = 'Directions';

export default Directions;
