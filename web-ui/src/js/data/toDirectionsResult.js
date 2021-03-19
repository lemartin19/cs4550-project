'use es6';

/* global google */

/**
 * This code was created modeled after the answer found at this public resource:
 * https://gis.stackexchange.com/questions/15197/google-maps-v3-in-javascript-api-render-route-obtained-with-web-api
 */

const asLatLng = (latLngObject) =>
  new google.maps.LatLng(latLngObject.lat, latLngObject.lng);

const asBounds = (boundsObject) =>
  new google.maps.LatLngBounds(
    asLatLng(boundsObject.southwest),
    asLatLng(boundsObject.northeast)
  );

const asPath = (encodedPolyObject) =>
  new google.maps.Polyline(encodedPolyObject.points);

export const toDirectionsResult = (routesString) => {
  const routes = JSON.parse(routesString);
  routes.forEach((route) => {
    route.bounds = asBounds(route.bounds);

    route.legs.forEach((leg) => {
      leg.start_location = asLatLng(leg.start_location);
      leg.end_location = asLatLng(leg.end_location);

      leg.steps.forEach((step) => {
        step.start_location = asLatLng(step.start_location);
        step.end_location = asLatLng(step.end_location);
        step.path = asPath(step.polyline);
      });
    });
  });
  return routes;
};
