import React, { useState, useEffect } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import { MapPin } from 'lucide-react';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || 'pk.eyJ1IjoiZXhhbXBsZXVzZXIiLCJhIjoiY2xrOHNxZGRqMDJxZDNmcGVhdnpxOHZvdyJ9.GXx9N4Ek9kXo8rTXdwNY2Q';

function Home() {
  const [viewport, setViewport] = useState({
    latitude: 37.7749,
    longitude: -122.4194,
    zoom: 12
  });
  const [userLocation, setUserLocation] = useState(null);
  const [mapError, setMapError] = useState('');
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          setViewport(prev => ({
            ...prev,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }));
        },
        error => {
          console.error("Error getting user location:", error);
          setMapError("Unable to get your location. Using default location.");
        }
      );
    } else {
      setMapError("Geolocation is not supported by your browser.");
    }

    // Fetch nearby locations
    axios.get('/api/locations')
      .then(response => setLocations(response.data))
      .catch(error => console.error("Error fetching locations:", error));
  }, []);

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
  };

  return (
    <div className="relative w-full h-[calc(100vh-100px)]">
      {mapError && (
        <div className="absolute top-4 left-4 right-4 glassmorphic p-2 z-10 text-red-500">
          {mapError}
        </div>
      )}
      <Map
        {...viewport}
        onMove={evt => setViewport(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/dark-v10"
        mapboxAccessToken={MAPBOX_TOKEN}
        className="w-full h-full rounded-xl overflow-hidden"
      >
        {userLocation && (
          <Marker longitude={userLocation.longitude} latitude={userLocation.latitude}>
            <MapPin className="text-neon-blue" size={32} />
          </Marker>
        )}
        {locations.map(location => (
          <Marker
            key={location.id}
            longitude={location.longitude}
            latitude={location.latitude}
            onClick={() => handleLocationClick(location)}
          >
            <MapPin className="text-neon-purple cursor-pointer" size={32} />
          </Marker>
        ))}
        {selectedLocation && (
          <Popup
            longitude={selectedLocation.longitude}
            latitude={selectedLocation.latitude}
            onClose={() => setSelectedLocation(null)}
            closeOnClick={false}
            className="glassmorphic"
          >
            <div className="p-2">
              <h3 className="font-bold text-neon-blue">{selectedLocation.name}</h3>
              <p className="text-white">{selectedLocation.description}</p>
              <button
                className="mt-2 px-4 py-2 bg-neon-purple bg-opacity-50 text-white rounded hover:bg-opacity-70 transition"
                onClick={() => {/* Implement booking logic */}}
              >
                Book Now
              </button>
            </div>
          </Popup>
        )}
      </Map>
      <div className="absolute bottom-4 left-4 right-4 glassmorphic p-4">
        <h2 className="text-2xl font-bold mb-2 neon-text">Welcome to Holomen</h2>
        <p className="text-white">Discover and book amazing holographic experiences near you!</p>
      </div>
    </div>
  );
}

export default Home;