import React, { useCallback, useEffect } from 'react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';

const PropertyMap = ({ lat, lng }) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  
  const { isLoaded, loadError } = useLoadScript({
    // id: 'google-map-script',
    googleMapsApiKey: apiKey,
    libraries: ['places']
  });

  const center = { 
    lat: lat && !isNaN(parseFloat(lat)) ? parseFloat(lat) : 0, 
    lng: lng && !isNaN(parseFloat(lng)) ? parseFloat(lng) : 0
  };

  const mapOptions = {
    disableDefaultUI: true,
    zoomControl: true,
    streetViewControl: true,
    mapTypeControl: false,
  };

  useEffect(() => {
    if (loadError) {
      console.error('Google Maps load error:', loadError);
    }
  }, [loadError]);

  if (loadError) {
    return (
      <div className="h-[400px] bg-gray-100 flex items-center justify-center text-red-500">
        Error loading map. Please check your API configuration.
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="h-[400px] bg-gray-100 flex items-center justify-center">
        Loading map...
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerClassName="w-full h-[400px] rounded-lg"
      center={center}
      zoom={15}
      options={mapOptions}
    >
      {center.lat !== 0 && center.lng !== 0 && (
        <MarkerF position={center} />
      )}
    </GoogleMap>
  );
};

export default PropertyMap;