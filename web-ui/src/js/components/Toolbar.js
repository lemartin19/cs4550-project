'use es6';

import { useGoToCurrentLocation } from '../hooks/useGoToCurrentLocation';

const Toolbar = () => {
  const { goToCurrentLocation } = useGoToCurrentLocation();
  return (
    <div className="Toolbar">
      <button className="btn btn-primary" onClick={goToCurrentLocation}>
        Current Location
      </button>
    </div>
  );
};
Toolbar.displayName = 'Toolbar';

export default Toolbar;
