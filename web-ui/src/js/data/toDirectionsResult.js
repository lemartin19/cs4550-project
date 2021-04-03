'use es6';

/* global google */

/**
 * This code was created modeled after the answer found at this public resource:
 * https://gis.stackexchange.com/questions/15197/google-maps-v3-in-javascript-api-render-route-obtained-with-web-api
 */

const asBounds = (bounds) => ({
  north: bounds.northeast.lat,
  east: bounds.northeast.lng,
  south: bounds.southwest.lat,
  west: bounds.southwest.lng,
});

const asPath = ({ points }) => google.maps.geometry.encoding.decodePath(points);

export const toDirectionsResult = (routes) => {
  const newRoutes = [];
  routes.forEach((route) => {
    const newRoute = {};
    newRoute.bounds = asBounds(route.bounds);

    newRoute.legs = [];
    route.legs.forEach((leg) => {
      const newLeg = { steps: [] };
      leg.steps.forEach((step) => {
        const newStep = {};
        newStep.path = asPath(step.polyline);
        newLeg.steps.push(newStep);
      });
      newRoute.legs.push(newLeg);
    });
    newRoutes.push(newRoute);
  });
  return newRoutes;
};
