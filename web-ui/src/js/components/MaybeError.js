'use es6';

import React from 'react';
import { Alert } from 'react-bootstrap';

const MaybeError = ({ error }) =>
  !error ? null : <Alert variant="danger">{error}</Alert>;
MaybeError.displayName = 'MaybeError';

export default MaybeError;
