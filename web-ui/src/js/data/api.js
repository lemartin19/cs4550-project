'use es6';

import { isQa } from '../constants/config';

const API_BASE = isQa()
  ? 'https://project-api.qa.seablue.site/api/v1'
  : 'https://project-api.seablue.site/api/v1';

export const apiFetch = ({ path, type, token, method, requestArgs }) =>
  fetch(`${API_BASE}${path}`, {
    method,
    headers: token
      ? {
          'Content-Type': 'application/json',
          'x-auth': token,
        }
      : { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestArgs),
  })
    .then((response) =>
      response.status === 204 ? { data: {} } : response.json()
    )
    .then((response) => {
      if (response.data) return response;
      const message = Object.keys(response.errors)
        .map((key) => `${key}: ${response.errors[key].toString()}`)
        .join('\n');
      throw new Error(message);
    })
    .then(({ data }) => ({ type, requestArgs, payload: data }));
