import React, { useRef } from 'react'
import { GoogleMap, useJsApiLoader, StandaloneSearchBox } from '@react-google-maps/api'
import { Input } from '@nextui-org/react';
import StripeTrial from '../components/StripeTrial';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from '@stripe/react-stripe-js';
import { useLocation, useNavigate } from "react-router-dom";
import { fetchBookingDetialsByID } from "../features/Booking/BookingActions";


const key = import.meta.env.VITE_STRIPE_PUBLISH_KEY

const stripePromise = loadStripe(key);

const containerStyle = {
  width: '400px',
  height: '400px',
}

const center = {
  lat: -3.745,
  lng: -38.523,
}
const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

function Trial() {
    const inputref = useRef()
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_API_KEY,
    libraries: ["places"]
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center)
    map.fitBounds(bounds)

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  const handleOnPlacesChanged = ()=>{
    let address = inputref.current.getPlaces()
    console.log("address",add);
    
  }


  return isLoaded ? (
    <>
    {/*  */}
    <div>
        <StandaloneSearchBox
        onLoad={(ref)=>inputref.current=ref}
        onPlacesChanged={handleOnPlacesChanged}
        >
            
         <div className="flex w-full flex-wrap md:flex-nowrap gap-4 p-10">
      <Input type="text" label="Search location" placeholder='Search Location'
        className="max-w-xs"
        />
    </div>
        </StandaloneSearchBox>
    {/* <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <></>
    </GoogleMap> */}
    <Elements stripe={stripePromise}>
    <StripeTrial stripePromise={stripePromise}/>
    </Elements>
    </div>
    </>
  ) : (
    <></>
  )
}

export default React.memo(Trial)

// ============================Booking=========================================


const BookingSuccessPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const bookingId = queryParams.get('booking_id');
  const [bookingDetails, setBookingDetails] = useState('')
  console.log('Booking ID:', bookingId);

  useEffect(()=>{
    fetchBookingDetialsByID(bookingId,setBookingDetails)
  },[bookingId])
  
  // useEffect(() => {
  //   // Redirect to the booking details page or home after a delay
  //   setTimeout(() => {
  //     navigate(`/`);
  //   }, 5000); // redirect after 5 seconds
  // }, [bookingId, navigate]);

  return (
    <>
    {bookingDetails}
    </>
  // <div
  //   className="relative min-h-screen bg-cover bg-center"
  //   style={{
  //     backgroundImage: "url('/pro_own/auth_bg.jpg')"
  //     // backgroundImage: `${bookingDetails.booking_image_url}`
  //   }}
  // >
  //   <div className="absolute inset-0 bg-[#221a1a] bg-opacity-35  z-0"></div>
  //   <div className="relative z-10 flex justify-center items-center min-h-screen">
  //   {bookingDetails.booking_image_url}fsdgds  
  //   </div>
  // </div>
  );
};

export {BookingSuccessPage};
// ============================Booking=========================================


function WebSocketTest() {
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState('');
    const [receivedMessages, setReceivedMessages] = useState([]);

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8000/ws/test/');
        
        ws.onopen = () => {
            console.log('WebSocket Connected');
            setSocket(ws);
        };

        ws.onmessage = (event) => {
          console.log('messaging socket');
            const data = JSON.parse(event.data);
            setReceivedMessages(prev => [...prev, data.message]);
        };

        return () => {
            ws.close();
        };
    }, []);

    const sendMessage = () => {
        if (socket && message) {
            socket.send(JSON.stringify({ message }));
            setMessage('');
        }
    };

    return (
        <div>
            <input 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter message"
            />
            <button onClick={sendMessage}>Send</button>
            <div>
                {receivedMessages.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
            </div>
        </div>
    );
}

export  {WebSocketTest};

// ==========================COMPONENT TESTING=================================


