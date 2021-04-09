'use es6';

import { useSelector } from 'react-redux';
import { getVisitors } from '../data/visitors';

export const useCurrentVisitors = () => {
  const visitors = useSelector(getVisitors);
  return { visitors };
};
