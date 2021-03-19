'use es6';

import React, { useEffect, useState } from 'react';

const Directions = () => {
  const [response, setResponse] = useState('');

  useEffect(() => {
    fetch('https://project-api.seablue.site/api/v1/routes/1')
      .then((response) => response.json())
      .then(({ data }) => setResponse(data))
      .catch((err) => console.log(err));
  }, []);

  return <div className="m-4">response: {response}</div>;
};
Directions.displayName = 'Directions';

export default Directions;
