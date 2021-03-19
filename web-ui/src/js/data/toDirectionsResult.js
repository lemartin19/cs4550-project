'use es6';

/* global google */

/**
 * This code was created modeled after the answer found at this public resource:
 * https://gis.stackexchange.com/questions/15197/google-maps-v3-in-javascript-api-render-route-obtained-with-web-api
 */

const asBounds = ({ southwest, northeast }) =>
  new google.maps.LatLngBounds(southwest, northeast);

const asPath = ({ points }) => google.maps.geometry.encoding.decodePath(points);

export const toDirectionsResult = (routesString) => {
  const routes = JSON.parse(routesString);
  routes.forEach((route) => {
    route.bounds = asBounds(route.bounds);

    route.legs.forEach((leg) => {
      leg.steps.forEach((step) => {
        step.path = asPath(step.polyline);
      });
    });
  });
  return routes;
};
