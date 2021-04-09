'use es6';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSessionToken } from '../data/login';
import { getStagedRoute, setMarkers } from '../data/routes';

export const useUndoMarker = ({ undoMarkerButton }) => {
  const dispatch = useDispatch();
  const { points } = useSelector(getStagedRoute);
  const token = useSelector(getSessionToken);

  useEffect(() => {
    if (undoMarkerButton) {
      undoMarkerButton.addEventListener('click', () =>
        setMarkers(points, token).then(dispatch)
      );
    }
  }, [points, token, undoMarkerButton]);
};
