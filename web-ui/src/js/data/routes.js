'use es6';

export const fetchRoute = () =>
  fetch('https://project-api.seablue.site/api/v1/routes/1')
    .then((response) => response.json())
    .then(({ data }) => data)
    .catch((err) => console.log(err));
