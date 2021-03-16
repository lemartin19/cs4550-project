import { useEffect } from 'react';
import { useGoToCurrentLocation } from './useGoToCurrentLocation';

const useInitMap = () => {
  useEffect(() => {
    const googleMapsScript = document.createElement('script');
    googleMapsScript.src =
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyAA8OS03M6dxV859lJuJQDn7S0GLnV_L78&callback=initMap';
    googleMapsScript.async = true;

    const initMapScript = document.createElement('script');
    initMapScript.text = `
    // Note: This example requires that you consent to location sharing when
    // prompted by your browser. If you see the error "The Geolocation service
    // failed.", it means you probably did not give permission for the browser to
    // locate you.
    
    function initMap() {
      const map = new google.maps.Map(document.getElementById("Map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 6,
      });
      const infoWindow = new google.maps.InfoWindow();
      
      const currentLocationButton = document.createElement('button');
      currentLocationButton.id = "go-to-current-location";
      currentLocationButton.textContent = 'Pan to Current Location';
      currentLocationButton.classList.add('custom-map-control-button');
      map.controls[google.maps.ControlPosition.TOP_CENTER].push(currentLocationButton);

      window.initMapCallback({ map, infoWindow });
    }`;

    document.body.appendChild(googleMapsScript);
    document.body.appendChild(initMapScript);

    return () => {
      document.body.removeChild(googleMapsScript);
      document.body.removeChild(initMapScript);

      window.map = undefined;
      window.infoWindow = undefined;
    };
  }, []);
};

export const useMap = () => {
  useInitMap();
  useGoToCurrentLocation();
};
