import React, { useEffect, useRef, useState } from 'react'
import { MapPin, Search } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router'
import { GoogleMap, useJsApiLoader, StandaloneSearchBox } from '@react-google-maps/api'
import { Field } from 'formik';



const LocationField = ({setFieldValue }) => {
    const inputRef = useRef(null);
    const [isApiLoaded, setIsApiLoaded] = useState(false);
    const [apiError, setApiError] = useState(null);
  
    const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

    const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: GOOGLE_API_KEY,
      libraries: ["places"]
    });
  
    useEffect(() => {
      setIsApiLoaded(isLoaded);
    }, [isLoaded]);
  

  const inputref = useRef()


  const handleOnPlacesChanged = () => {
    const places = inputref.current.getPlaces();
    if (places && places.length > 0) {
      const place = places[0];
      setFieldValue('lat', place.geometry.location.lat());
      setFieldValue('lng', place.geometry.location.lng());
      setFieldValue('address', place.formatted_address);
      setFieldValue('location', place.name);
      place.address_components.forEach(component => {
        if (component.types.includes('locality')) {
          setFieldValue('city', component.long_name);
        }
        if (component.types.includes('postal_code')) {
          setFieldValue('postcode', component.long_name);
        }
      });
      console.log(place);
    }else {
      console.error('No places found');
    }
  };


  return isLoaded ? (
    <>
    
        <StandaloneSearchBox
               onLoad={(ref)=>inputref.current=ref}
               onPlacesChanged={handleOnPlacesChanged}
        >
           <div className='flex justify-between border border-gray-300 focus:ring-1 focus:ring-themeColor2 focus:outline-none shadow-md rounded-xl'>
            <div className="flex items-center p-2 text-gray-400">
            <MapPin className="h-5 w-5" />
            </div>
            {<Field
            type="text"
            name="location"
            placeholder="Location of your property"
            className="flex-1  py-2 text-gray-800 bg-transparent focus:outline-none"
                />}
      
         </div>
        </StandaloneSearchBox>
          
          </>
  ):

    <>         
        <div className='flex justify-between border border-gray-300 focus:ring-1 focus:ring-themeColor2 focus:outline-none shadow-md rounded-xl'>
            <div className="flex items-center p-2 text-gray-400">
            <MapPin className="h-5 w-5" />
            </div>
            <Field
            type="text"
            name="location"
            placeholder="Location of your property"
            className="flex-1  py-2 text-gray-800 bg-transparent focus:outline-none"
            />
         </div>
    </>
}

export default LocationField
