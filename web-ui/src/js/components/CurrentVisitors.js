'use es6';

import React from 'react';
import { useCurrentVisitors } from '../hooks/useCurrentVisitors';

const NoVisitors = () => <div>No visitors currently on this route.</div>;
NoVisitors.displayName = 'NoVisitors';

const SomeVisitors = ({ visitors }) =>
  visitors.length <= 2 ? (
    <div>
      {visitors[0]} {visitors.length > 1 ? `and ${visitors[1]} are` : 'is'}{' '}
      currently on this route.
    </div>
  ) : (
    <div>
      {visitors[0]}, {visitors[1]}, and {visitors.length - 2} other
      {visitors.length === 3 ? '' : 's'} are currently on this route.
    </div>
  );
SomeVisitors.displayName = 'SomeVisitors';

const CurrentVisitors = () => {
  const { visitors } = useCurrentVisitors();
  return visitors.length === 0 ? (
    <NoVisitors />
  ) : (
    <SomeVisitors visitors={visitors} />
  );
};
CurrentVisitors.displayName = 'CurrentVisitors';

export default CurrentVisitors;
