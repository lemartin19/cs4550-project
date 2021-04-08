'use es6';

import React from 'react';
import { useEditRoute } from '../hooks/useEditRoute';
import Map from './Map';

const EditRoute = () => {
  useEditRoute();
  return <Map />;
};
EditRoute.displayName = 'EditRoute';

export default EditRoute;
