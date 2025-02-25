import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Search } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router';
import { useJsApiLoader, StandaloneSearchBox } from '@react-google-maps/api';
import { getAllPropertiesNearby } from '@/features/Property/PropertyServices';
import { useDispatch } from 'react-redux';
import { setAllPropertyResults } from '@/features/Property/PropertySlice';

const PropertyLocationSearch = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const inputRef = useRef();
  const dispatch = useDispatch();
  
  
  const [searchTerm, setSearchTerm] = useState('');
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryParam = params.get('query');
    const latParam = params.get('lat');
    const lngParam = params.get('lng');

    if (queryParam) {
      setSearchTerm(decodeURIComponent(queryParam));
    }

    if (latParam && lngParam) {
      setCoordinates({
        lat: parseFloat(latParam),
        lng: parseFloat(lngParam)
      });
    }
  }, [location.search]);

  const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_API_KEY,
    libraries: ["places"]
  });

  const handleOnPlacesChanged = () => {
    const places = inputRef.current.getPlaces();
    if (places && places.length > 0) {
      const place = places[0];
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      
      setCoordinates({ lat, lng });
      setSearchTerm(place.formatted_address);
    }
  };

  const handleSearch = async () => {
    if (!coordinates.lat || !coordinates.lng) {
      alert('Please select a location from the dropdown');
      return;
    }

    try {
      console.log('Searching properties nearby:', coordinates);
      const response = await getAllPropertiesNearby(coordinates.lat, coordinates.lng);
      console.log(response.data.properties,'response')
      dispatch(setAllPropertyResults(response.data));
       if (!response.data) {
        console.log('Search failed:', response);
        throw new Error('Search failed');
      }
      
      navigate(`/property-results?lat=${coordinates.lat}&lng=${coordinates.lng}&query=${encodeURIComponent(searchTerm)}`);
    } catch (error) {
      console.error('Search error:', error);
      alert('Failed to search properties. Please try again.');
    }
  };

  const searchBox = (
    <div className="flex justify-between border rounded-lg shadow-sm">
      <div className="flex items-center pl-4 text-gray-400">
        <MapPin className="h-5 w-5" />
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Where do you want to go?"
        className="flex-1 px-4 py-3 text-gray-800 bg-transparent focus:outline-none"
      />
      <button
        className="m-1 px-3 md:px-8 py-2 bg-themeColor text-white rounded-md hover:bg-orange-600 transition-colors"
        onClick={handleSearch}
      >
        <span className="hidden md:inline">Search</span>
        <Search className="md:hidden h-5 w-5" />
      </button>
    </div>
  );

  return isLoaded ? (
    <StandaloneSearchBox
      onLoad={ref => (inputRef.current = ref)}
      onPlacesChanged={handleOnPlacesChanged}
    >
      {searchBox}
    </StandaloneSearchBox>
  ) : searchBox;
};

export default PropertyLocationSearch;