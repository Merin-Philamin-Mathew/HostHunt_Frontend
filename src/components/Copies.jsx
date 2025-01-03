import React, { useEffect, useState, useRef } from 'react'
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

export default function PropertyDisplayPage({ property = {
  // ... your property default props remain the same
}}) {
  const [propertyDetails, setPropertyDetails] = useState('')
  const [activeTab, setActiveTab] = useState('overview')
  
  // Create refs for each section
  const photosRef = useRef(null)
  const overviewRef = useRef(null)
  const roomsRef = useRef(null)

  useEffect(() => {
    const property_id = localStorage.getItem('property_id') 
    fetchDetailedDisplay_property(property_id, setPropertyDetails)
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
        <div className="min-h-screen bg-gray-50">
          {/* Photos Section */}
          <div ref={photosRef}>
            <PropertyDisplayImageSection propertyDetails={propertyDetails}/>
          </div>
   
          {/* Content */}
          <div>
            {/* Sticky Tabs */}
            <div className="sticky top-0 z-50 pt-8 bg-white">
              <div className="border-b">
                <div className="flex gap-8">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => handleTabClick(tab.id)}
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
            </div>

            {/* Overview Section */}
            <div ref={overviewRef}>
              <div className="flex justify-between items-start mb-8 mt-8">
                <div>
                  <h1 className="text-2xl font-bold mb-2">{propertyDetails?.property_details?.property_name}</h1>
                  <PD_ReviewSection propertyDetails/>
                  <p className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    {propertyDetails?.property_details?.city}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2">
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

                    {/* Rooms Section */}
                    <section ref={roomsRef}>
                      <h2 className="text-xl font-semibold mb-4">Available rooms</h2>
                      <div className="space-y-4">
                        <Elements stripe={stripePromise}>
                          <PublishedRoomCard rooms={propertyDetails?.rooms} stripePromise={stripePromise}/>
                        </Elements>
                      </div>
                    </section>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-lg shadow-lg p-6 hidden">
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
                      <div className="w-full h-full flex items-center justify-center text-gray-500">
                        Map View
                      </div>
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