'ues es6';

import React from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import {
  setDistanceFilter,
  setOwnerFilter,
  toggleIsMetric,
} from '../data/filters';

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
        />
        <Form.Control
          type="text"
          id="owner"
          placeholder="Owner"
          onChange={({ target }) => dispatch(setOwnerFilter(target.value))}
          className="mx-2"
        />
        <Form.Control
          as="select"
          id="distance"
          onChange={({ target }) => {
            dispatch(setDistanceFilter(target.selectedOptions));
          }}
          className="mx-2 "
        >
          <option value="0-X">no filter</option>
          <option value="0-5000">less than a 5k</option>
          <option value="5000-10000">between a 5k and 10k</option>
          <option value="10000-21100">between a 10k and half-marathon</option>
          <option value="21100-42200">
            between a half-marathon and a marathon
          </option>
          <option value="42200-X">ultra marathon</option>
        </Form.Control>
      </Form>
    </div>
  );
};
FeedFilters.displayName = 'FeedFilters';

export default FeedFilters;
