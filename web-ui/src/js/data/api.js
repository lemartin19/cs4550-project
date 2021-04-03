'use es6';

const API_BASE = 'https://project-api.seablue.site/api/v1';

export const apiFetch = ({ path, type, token, method, body }) =>
  fetch(`${API_BASE}${path}`, {
    method,
    headers: token
      ? {
          'Content-Type': 'application/json',
          'x-auth': token,
        }
      : { 'Content-Type': 'application/json' },
    body,
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.data) return response;
      const message = Object.keys(response.errors)
        .map((key) => `${key}: ${response.errors[key].toString()}`)
        .join('\n');
      throw new Error(message);
    })
    .then(({ data }) => ({ type, payload: data }));
