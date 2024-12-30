import React, { useEffect, useRef, useState } from 'react'
import { MapPin, Wifi, Wind, Car, Music, Monitor } from 'lucide-react'

import PD_ReviewSection from '../../../components/user/PropertyDisplayPage/PD_ReviewSection';
import PublishedRoomCard from '../../../components/utils/cards/Rooms/PublishedRoomCard';
import { fetchDetailedDisplay_property, handlePublishingProperty } from '../../../features/Property/PropertyActions';
import { Grid, Image } from 'lucide-react'
import { useNavigate } from 'react-router';
import PropertyDisplayImageSection from '@/components/properties/PropertyDisplayImageSection';
import PD_OverviewSection from '@/components/user/PropertyDisplayPage/PD_OverviewSection';

export default function PreviewProperty(
    
  { property = {
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

}}
) {
  const [propertyDetails, setPropertyDetails] = useState('')
  const [activeTab, setActiveTab] = useState('overview')
  const property_id = localStorage.getItem('property_id')
  const navigate = useNavigate() 

      // Create refs for each section
      const photosRef = useRef(null)
      const overviewRef = useRef(null)
      const roomsRef = useRef(null)
    

  useEffect(() => {
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

  const handlePublishingPropertyView = (propertyDetails) => {
    if (!propertyDetails?.property_details?.description) {
      handleTabClick('overview')
      const generateButton = document.getElementById('generate-description-btn');
      console.log('generateButton',generateButton);
      
      if (generateButton) {
        generateButton.classList.add('animate-shake');
        setTimeout(() => {
          generateButton.classList.remove('animate-shake');
        }, 2800);
      }
    } else {
      handlePublishingProperty(propertyDetails, navigate);
    }
  };

  const handleSaveDescription = (newDescription) => {
    console.log('description saving ........ ')
    const updatedDetails = {
      ...propertyDetails,
      property_details: {
        ...propertyDetails.property_details,
        description: newDescription,
      },
    };

    setPropertyDetails(updatedDetails);
    console.log('Saving description:', newDescription);
  };

  return (
    <>
    <div className='flex flex-col p-4 md:p-8 rounded-3xl bg-white shadow-xl'>
    <div className="min-h-screen">
        {/* Photos Section */}
        <div ref={photosRef}>
            <PropertyDisplayImageSection propertyDetails={propertyDetails}/>
          </div>  
      {/* Content */}
      <div >
        {/* Sticky Tabs */}
        <div className="sticky top-[200px]  t-8 bg-white pt-8">
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
                <PD_OverviewSection 
                  propertyDetails={propertyDetails}
                  onSave={handleSaveDescription}
                />
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

                <section  ref={roomsRef}>
                <h2 className="text-xl font-semibold mb-4">Available rooms</h2>
                  <div className="space-y-4">
                    <PublishedRoomCard rooms={propertyDetails?.rooms} />
                  </div>
                </section>
              </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 hidden" >
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

    <div className="flex justify-center mt-8">
      <button
        onClick={()=>handlePublishingPropertyView(propertyDetails.property_details)}
        className="px-6 py-2 bg-themeColor text-white rounded-xl hover:opacity-90 shadow-md"
      >
        Submit and Publish Property
      </button>
    </div>
    </>
  )
}