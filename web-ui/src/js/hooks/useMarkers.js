'use es6';

import { postMarker } from '../data/routes';

export const useWaypoints = ({ map }) => {
  map.addListener('click', (mapsMouseEvent) => {
    console.log('click at: ' + JSON.stringify(mapsMouseEvent.latLng.toJSON()));
    postMarker(mapsMouseEvent.latLng.toJSON());
  });
};
