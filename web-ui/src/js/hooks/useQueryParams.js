'use es6';

import { useLocation } from 'react-router-dom';

export const useQueryParams = () => {
  const { search } = useLocation();

  if (!search.startsWith('?')) return {};

  const params = {};

  search
    .substring(1)
    .split('&')
    .map((param) => {
      const [key, value] = param.split('=');
      return { key, value };
    })
    .forEach(({ key, value }) => {
      params[key] = value;
    });
  return params;
};
