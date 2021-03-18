'use es6';

import { useEffect } from 'react';

const Directions = () => {
  const [response, setResponse] = useState('');

  useEffect(() => {
    fetch('https://project-api.seablue.site/api/v1/route/1', {})
      .then(setResponse)
      .catch((err) => console.log(err));
  });

  return <p>{response}</p>;
};
Directions.displayName = 'Directions';

export default Directions;
