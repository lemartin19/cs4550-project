'use es6';

import React, { useEffect, useState } from 'react';

const Directions = () => {
  const [response, setResponse] = useState('');

  useEffect(() => {
    fetch('http://project-api.seablue.site/api/v1/route/1', {})
      .then(setResponse)
      .catch((err) => console.log(err));
  });

  return <div className="m-4">response: {response}</div>;
};
Directions.displayName = 'Directions';

export default Directions;
