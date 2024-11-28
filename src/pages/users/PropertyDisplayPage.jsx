import React, { useEffect, useState } from 'react'
import { MapPin, Wifi, Wind, Car, Music, Monitor } from 'lucide-react'
import SearchHeader from '../../components/user/partials/SearchHeader'
import Container from '../../components/utils/Containers/Container'
import PublishedRoomCard from '../../components/utils/cards/Rooms/PublishedRoomCard'
import { fetchDetailedDisplay_property } from '../../features/Property/PropertyActions'
import SmContainer from '../../components/utils/Containers/SmContainer'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from '@stripe/react-stripe-js';


export default function PropertyDisplayPage(
  { property = {
  name: "Zostel Kochi (Ernakulam)",
  rating: 4.5,
  reviews: 1156,
  address: "Lakshi (guest road, ward-2633, Kerala, Kerala",
  description: "Featuring free WiFi throughout the property, Lakeside Motel Waterfront offers accommodations in Lakes kitchezh, 19 km from Barnstable. Free private parking is available on site.\n\nEach room at this hotel is air conditioned and comes with a flat-screen TV. You will find a kettle, toaster and a microwave in the room. Each room is fitted with a private bathroom. Guests have access to barbecue facilities and a lovely large lawn area. Marina is 8.8 km from Lakeside Motel Waterfront, while Paynesvilla is.",
  nearbyPlaces: [
    // { name: "Hotel Recidencia", distance: "2 min drive" },
    // { name: "Norman Opera Class", distance: "14 min drive" },
    // { name: "Residual hotel", distance: "21 min drive" }
  ],
  facilities: [
    { icon: Wifi, name: "Free wifi" },
    { icon: Wind, name: "Air Conditioning" },
    { icon: Car, name: "Parking available" },
    { icon: Music, name: "Entertainment Area" },
    { icon: Monitor, name: "All media available" }
  ],
  rooms: [
    {
      id: 1,
      name: "Standard 6 Bed Mixed Dorm",
      type: "Bed in 6 Bed Mixed Dormitory with Balcony",
      occupancy: "Sleeps 6",
      price: "€4.56",
      bedsLeft: 4,
      image: "/dorm1.jpg"
    },
    {
      id: 2,
      name: "Standard 6 Bed Female Dorm",
      type: "Bed in 6 Bed Mixed Dormitory with Balcony",
      occupancy: "Sleeps 6",
      price: "€4.56",
      bedsLeft: 4,
      image: "/dorm2.jpg"
    }
  ]
}}
) {
  const [propertyDetails, setPropertyDetails] = useState('')
  useEffect(() => {
    const property_id = localStorage.getItem('property_id') 
    fetchDetailedDisplay_property(property_id,setPropertyDetails)

  }, []);

  const [activeTab, setActiveTab] = useState('overview')
  

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'rooms', label: 'Rooms' },
    { id: 'reviews', label: 'Guest Reviews' }
  ]

  const key = import.meta.env.VITE_STRIPE_PUBLISH_KEY

  const stripePromise = loadStripe(key);

  return (
    <>
      <SearchHeader />
    <Container>
    <div className="min-h-screen bg-gray-50">
      {/* Hero Image */}
      <div className="h-[400px] relative">
        <img
          src={`${propertyDetails?.property_details?.thumbnail_image_url}`}
          alt={propertyDetails?.property_details?.property_name}
          className="w-full h-full object-cover"
        />
      
      </div>

      {/* Content */}
      <div className="py-8">
        {/* Tabs */}
        <div className="border-b mb-8">
          <div className="flex gap-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 px-2 font-medium transition-colors relative ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Property? Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-2">{propertyDetails?.property_details?.property_name}</h1>

{/* REVIEW SIDE STARTED */}
            <div className="flex items-center gap-2 mb-2">
            {propertyDetails?.property_reviews ? 
                (<>
                <div className="flex">
                
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(property?.rating)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              <span className="text-sm text-gray-600">
                {property?.rating} ({property?.reviews} Reviews)
              </span>
                </>): 
                
                <>
                <div className="flex">
                
                  <svg
                    className='w-4 h-4 text-yellow-400'
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
              </div>
              
              <span className="text-sm text-gray-600">
              No reviews yet
              </span>
                </>}
              
            </div>
{/* REVIEW SIDE ENDED */}

            <p className="flex items-center text-gray-600">
              <MapPin className="w-4 h-4 mr-2" />
              {property?.address}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <section>
                  <h2 className="text-xl font-semibold mb-4">Overview</h2>
                  <p className="text-gray-600 whitespace-pre-line">
                    {property?.description}
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4">Top facilities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {property?.facilities?.map((facility, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <facility.icon className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-600">{facility.name}</span>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4">Available rooms</h2>
                  <div className="space-y-4">
                  <Elements stripe={stripePromise}>
                  <PublishedRoomCard rooms={propertyDetails?.rooms} stripePromise={stripePromise}/>
                  </Elements>

                  </div>
                </section>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Location</h2>
              <div className="space-y-3">
                {property?.nearbyPlaces?.map((place, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-600">{place.name}</span>
                    <span className="text-gray-500 text-sm">
                      {place.distance}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 h-48 bg-gray-200 rounded-lg">
                {/* Map placeholder */}
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  Map View
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Container>
    </>
  )
}