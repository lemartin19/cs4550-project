'use es6';

import { useMemo, useState } from 'react';

export const useDistance = (meters = 0) => {
  const [isMetric, setMetric] = useState(false);

  const distance = useMemo(
    () =>
      isMetric
        ? `${(meters / 1000).toFixed(2)} km`
        : `${(meters / 1609.34).toFixed(2)} mi`,
    [meters, isMetric]
  );

  return { distance, changeUnits: () => setMetric((metric) => !metric) };
};
