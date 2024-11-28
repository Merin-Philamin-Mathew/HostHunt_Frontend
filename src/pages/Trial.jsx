// import React, { useRef } from 'react'
// import { GoogleMap, useJsApiLoader, StandaloneSearchBox } from '@react-google-maps/api'
// import { Input } from '@nextui-org/react';
// import StripeTrial from '../components/StripeTrial';
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from '@stripe/react-stripe-js';

// const key = import.meta.env.VITE_STRIPE_PUBLISH_KEY

// const stripePromise = loadStripe(key);

// const containerStyle = {
//   width: '400px',
//   height: '400px',
// }

// const center = {
//   lat: -3.745,
//   lng: -38.523,
// }
// const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

// function Trial() {
//     const inputref = useRef()
//   const { isLoaded } = useJsApiLoader({
//     id: 'google-map-script',
//     googleMapsApiKey: GOOGLE_API_KEY,
//     libraries: ["places"]
//   })

//   const [map, setMap] = React.useState(null)

//   const onLoad = React.useCallback(function callback(map) {
//     // This is just an example of getting and using the map instance!!! don't just blindly copy!
//     const bounds = new window.google.maps.LatLngBounds(center)
//     map.fitBounds(bounds)

//     setMap(map)
//   }, [])

//   const onUnmount = React.useCallback(function callback(map) {
//     setMap(null)
//   }, [])

//   const handleOnPlacesChanged = ()=>{
//     let address = inputref.current.getPlaces()
//     console.log("address",add);
    
//   }


//   return isLoaded ? (
//     <div>
//         <StandaloneSearchBox
//         onLoad={(ref)=>inputref.current=ref}
//         onPlacesChanged={handleOnPlacesChanged}
//         >
            
//          <div className="flex w-full flex-wrap md:flex-nowrap gap-4 p-10">
//       <Input type="text" label="Search location" placeholder='Search Location'
//         className="max-w-xs"
//         />
//     </div>
//         </StandaloneSearchBox>
//     {/* <GoogleMap
//       mapContainerStyle={containerStyle}
//       center={center}
//       zoom={10}
//       onLoad={onLoad}
//       onUnmount={onUnmount}
//     >
//       <></>
//     </GoogleMap> */}
//     <Elements stripe={stripePromise}>
//     <StripeTrial stripePromise={stripePromise}/>
//     </Elements>
//     </div>
//   ) : (
//     <></>
//   )
// }

// export default React.memo(Trial)

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/user/partials/header";

const BookingSuccessPage = ({ bookingId='booking id' }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the booking details page or home after a delay
    setTimeout(() => {
    //   navigate(`/bookings/${bookingId}`);
      navigate(`/`);
    }, 5000); // redirect after 5 seconds
  }, [bookingId, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
        {/* <Header/> */}
      <h1 className="text-4xl font-bold text-green-700">Booking Successful!</h1>
      <p className="text-lg mt-4 text-gray-600">
        Your booking has been successfully processed. You will receive a confirmation email shortly.
      </p>
      <p className="text-md mt-2 text-gray-500">Booking ID: {bookingId}</p>
      <div className="mt-6">
        <img
          src="https://example.com/success-image.jpg"
          alt="Booking Success"
          className="w-64 h-64 object-cover rounded-full"
        />
      </div>
      <p className="mt-4 text-center text-gray-600">
        You will be redirected shortly. If not, click{" "}
        <a href={`/bookings/${bookingId}`} className="text-blue-500">here</a>.
      </p>
    </div>
  );
};

export default BookingSuccessPage;

