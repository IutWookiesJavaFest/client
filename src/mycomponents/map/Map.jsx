import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import "mapbox-gl/dist/mapbox-gl.css";
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import './Map.css';

const Map = ({ markers }) => {
  const mapContainerRef = useRef(null);
  const mapboxAccessToken = import.meta.env.VITE_MAPBOX_TOKEN;
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // Get the user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          doctorName: 'My Location',
          isUserLocation: true
        });
      }, (error) => {
        console.error('Error getting user location:', error);
      });
    }
  }, []);

  useEffect(() => {
    mapboxgl.accessToken = mapboxAccessToken;
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: userLocation ? [userLocation.longitude, userLocation.latitude] : [90.40145, 23.911271], // Center on user location if available
      zoom: 7 // Initial zoom level
    });

    // Initialize Directions
    const directions = new MapboxDirections({
      accessToken: mapboxAccessToken,
      unit: 'metric',
      profile: 'mapbox/driving',
    });
    
    map.addControl(directions, 'top-left');

    // Add user's location marker
    if (userLocation) {
      new mapboxgl.Marker({
        color: 'blue',
        scale: 1
      })
      .setLngLat([userLocation.longitude, userLocation.latitude])
      .setPopup(new mapboxgl.Popup().setText(userLocation.doctorName))
      .addTo(map);
    }

    // Add other markers and set up click event to get directions
    markers.forEach(marker => {
      const markerElement = new mapboxgl.Marker({
        color: 'red',
        scale: 1
      })
      .setLngLat([marker.longitude, marker.latitude])
      .setPopup(new mapboxgl.Popup().setText(marker.doctorName))
      .addTo(map);

      // Add click event to get directions
      markerElement.getElement().addEventListener('click', () => {
        if (userLocation) {
          directions.setOrigin([userLocation.longitude, userLocation.latitude]);
          directions.setDestination([marker.longitude, marker.latitude]);
        } else {
          alert('User location not available.');
        }
      });
    });

    // Cleanup
    return () => map.remove();
  }, [markers, userLocation, mapboxAccessToken]);

  return (
    <div 
      ref={mapContainerRef} 
      style={{ width: "90%", aspectRatio: 2, margin: "auto"}} 
    />
  );
};

export default Map;
