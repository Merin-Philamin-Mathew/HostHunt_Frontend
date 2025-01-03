import React, { useEffect, useRef, useState } from 'react'
import { MapPin, Wifi, Wind, Car, Music, Monitor, Grid } from 'lucide-react'
import SearchHeader from '../../components/user/partials/SearchHeader'
import Container from '../../components/utils/Containers/Container'
import PublishedRoomCard from '../../components/utils/cards/Rooms/PublishedRoomCard'
import { fetchDetailedDisplay_property } from '../../features/Property/PropertyActions'
import SmContainer from '../../components/utils/Containers/SmContainer'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from '@stripe/react-stripe-js';
import PD_ReviewSection from '../../components/user/PropertyDisplayPage/PD_ReviewSection'
import { Dialog } from '@headlessui/react'
import { DialogContent } from '@radix-ui/react-dialog'
import PropertyDisplayImageSection from '@/components/properties/PropertyDisplayImageSection'

export default function PropertyDisplayPage(
  { property = {
  description: "Featuring free WiFi throughout the property, Lakeside Motel Waterfront offers accommodations in Lakes kitchezh, 19 km from Barnstable. Free private parking is available on site.\n\nEach room at this hotel is air conditioned and comes with a flat-screen TV. You will find a kettle, toaster and a microwave in the room. Each room is fitted with a private bathroom. Guests have access to barbecue facilities and a lovely large lawn area. Marina is 8.8 km from Lakeside Motel Waterfront, while Paynesvilla is.",
  facilities: [
    { icon: Wifi, name: "Free wifi" },
    { icon: Wind, name: "Air Conditioning" },
    { icon: Car, name: "Parking available" },
    { icon: Music, name: "Entertainment Area" },
    { icon: Monitor, name: "All media available" }
  ],
}}
) {
  const [propertyDetails, setPropertyDetails] = useState('')
  const [activeTab, setActiveTab] = useState('overview')

    // Create refs for each section
    const photosRef = useRef(null)
    const overviewRef = useRef(null)
    const roomsRef = useRef(null)
  
  
  useEffect(() => {
    const property_id = localStorage.getItem('property_id') 
    fetchDetailedDisplay_property(property_id,setPropertyDetails)
  }, []);

  
  const tabs = [
    { id: 'photos', label: 'Photos', ref: photosRef },
    { id: 'overview', label: 'Overview', ref: overviewRef },
    { id: 'rooms', label: 'Rooms', ref: roomsRef },
  ]

  const handleTabClick = (tabId) => {
    setActiveTab(tabId)
    
    // Find the corresponding ref for the tab
    const tab = tabs.find(t => t.id === tabId)
    if (tab?.ref?.current) {
      // Scroll to the section with a slight offset for the sticky header
      const offset = 80 // Adjust this value based on your header height
      const elementPosition = tab.ref.current.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  const key = import.meta.env.VITE_STRIPE_PUBLISH_KEY
  const stripePromise = loadStripe(key);

  return (
    <>
      <SearchHeader />
      <Container>
        <div className="min-h-screen bg-gray-50 mb-4">
          {/* Photos Section */}
          <div ref={photosRef}>
            <PropertyDisplayImageSection propertyDetails={propertyDetails}/>
          </div>   
          {/* Content */}
          <div >
            {/* Sticky Tabs */}
            <div className="sticky top-0 z-50 t-8 bg-white pt-8">
              <div className="border-b">
                <div className="flex gap-8">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => handleTabClick(tab.id)}
                      className={`pb-2 px-2 font-medium transition-colors relative ${
                        activeTab === tab.id
                          ? 'text-orange-600 border-b-2 border-orange-500'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Property Header */}
            <div className="flex justify-between items-start mb-8 mt-8">
          <div>
            <h1 className="text-2xl font-bold mb-2">{propertyDetails?.property_details?.property_name}</h1>
            <PD_ReviewSection property_reviews={propertyDetails.property_reviews}/>
            <p className="flex items-center text-gray-600">
              <MapPin className="w-4 h-4 mr-2" />
              {propertyDetails?.property_details?.city}
            </p>
          </div>
        </div>

             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
               <div className="lg:col-span-2">
                  <div className="space-y-8" >
                    
                    <section ref={overviewRef}>
                      <h2 className="text-xl font-semibold mb-4">Overview</h2>
                      <p className="text-gray-600 whitespace-pre-line">
                        {propertyDetails?.property_details?.description}
                      </p>
                    </section>

                    <section >
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

                    <section >
                      <h2 className="text-xl font-semibold mb-4"  ref={roomsRef}>Available rooms</h2>
                      <div className="space-y-4">
                        <Elements stripe={stripePromise}>
                          <PublishedRoomCard rooms={propertyDetails?.rooms} stripePromise={stripePromise}/>
                        </Elements>
                      </div>
                    </section>

                    <seciton className="my-6">
                  <h2 className="text-xl font-semibold mt-8">Location</h2>
                    <div className="bg-white rounded-lg shadow-lg p-6">
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
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      Map View
                    </div>
                  </div>
                </div>
                    </seciton>
                  </div>
              
               </div>

              {/* Sidebar right section */}
              {/*3333333 <div className="lg:col-span-1"> */}
             
              {/*3333333 </div> */}
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}