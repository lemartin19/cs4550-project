'ues es6';

import React from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { toggleIsMetric } from '../data/filters';

const FeedFilters = () => {
  const dispatch = useDispatch();
  return (
    <div className="my-4">
      <Form inline>
        <Form.Check
          type="switch"
          id="units"
          label="Imperial / Metric"
          onClick={() => dispatch(toggleIsMetric())}
        ></Form.Check>
      </Form>
    </div>
  );
};
FeedFilters.displayName = 'FeedFilters';

export default FeedFilters;
