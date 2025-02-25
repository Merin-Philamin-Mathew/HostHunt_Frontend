import React, { useCallback, useRef, useState } from 'react'
import { GoogleMap, useJsApiLoader, StandaloneSearchBox } from '@react-google-maps/api'
import { Input } from '@nextui-org/react';
import StripeTrial from '../components/StripeTrial';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from '@stripe/react-stripe-js';
import { useLocation, useNavigate } from "react-router-dom";
import { fetchBookingDetialsByID } from "../features/Booking/BookingActions";
import axios from 'axios';
import { api } from '@/apis/axios';


const key = import.meta.env.VITE_STRIPE_PUBLISH_KEY

const stripePromise = loadStripe(key);

const containerStyle = {
  width: '400px',
  height: '400px',
}



const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
function Trial() {
  const inputRef = useRef(null);
  const [center, setCenter] = useState({
    lat: 10.107187,
    lng: 76.359735,
  });

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_API_KEY,
    libraries: ['places'],
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, [center]);

  const onUnmount = useCallback((map) => {
    setMap(null);
  }, []);

  const handleOnPlacesChanged = () => {
    const places = inputRef.current.getPlaces();
    if (places && places.length > 0) {
      const place = places[0]; // Assuming you want the first result
      const latitude = place.geometry.location.lat();
      const longitude = place.geometry.location.lng();
      setCenter({
        lat: latitude,
        lng: longitude,
      });
      console.log('Latitude:', latitude, 'Longitude:', longitude);
    } else {
      console.error('No places found');
    }
  };
  // const [description, setDescription] = useState("");
  // const [question, setQuestion] = useState(""); // State for user input question


  // const handleDescription = async () => {
  //   try {
  //     const response = await api.post('/property/description',
  //       { question }, // Send question in the request body
  //     );
  //     console.log("ChatGPT response:", response);
  //     setDescription(response.data.response); // Match the response key from the backend
  //   } catch (error) {
  //     console.error('Error generating description:', error);
  //     alert('Failed to generate description. Please try again.');
  //   }
  // };
  
  return isLoaded ? (
    <>
    {/*  */}
    <div>
      <StandaloneSearchBox
        onLoad={(ref) => (inputRef.current = ref)}
        onPlacesChanged={handleOnPlacesChanged}
      >
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4 p-10">
          <Input
            type="text"
            label="Search location"
            placeholder="Search Location"
            className="max-w-xs"
          />
        </div>
      </StandaloneSearchBox>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      />
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


    
{/* <Elements stripe={stripePromise}>
<StripeTrial stripePromise={stripePromise}/>
</Elements>
<div className='mt-7'>
<Input
      type="text"
      label="Ask a Question"
      placeholder="Enter your question"
      value={question}
      onChange={(e) => setQuestion(e.target.value)}
      className="max-w-lg mb-4"
    />
<button
    className="p-2 bg-orange-400"
    onClick={()=>handleDescription()}
  >
    Generate Description
  </button>


  {description && (
<div className="mt-4 p-4 border rounded bg-gray-100">
<h2>Generated Descriptions:</h2>
<ul>
  {Object.entries(description).map(([key, desc], index) => (
    <div className='bg-violet-300 my-3 p-3'>
      
      <li key={key} style={colorStyle}>
      <strong>Description {index + 1}:</strong> {desc}
    </li>;
    </div>
  ))}
</ul>
</div>
)}


  </div> */}
