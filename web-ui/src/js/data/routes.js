'use es6';

export const fetchRoute = () =>
  fetch('https://project-api.seablue.site/api/v1/routes/1')
    .then((response) => response.json())
    .then(({ data }) => data)
    .catch((err) => console.log(err));

export const postMarker = (points) => {
  return fetch('https://project-api.seablue.site/api/v1/routes/1/add_marker', {
    method: 'POST',
    body: JSON.stringify({ points }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(({ data }) => data)
    .catch((err) => console.log(err));
};
