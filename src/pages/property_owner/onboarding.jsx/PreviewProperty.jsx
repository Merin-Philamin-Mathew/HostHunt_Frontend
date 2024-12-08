import React, { useEffect, useState } from 'react'
import { MapPin, Wifi, Wind, Car, Music, Monitor } from 'lucide-react'

import PD_ReviewSection from '../../../components/user/PropertyDisplayPage/PD_ReviewSection';
import PublishedRoomCard from '../../../components/utils/cards/Rooms/PublishedRoomCard';
import { fetchDetailedDisplay_property, handlePublishingProperty } from '../../../features/Property/PropertyActions';
import { Grid, Image } from 'lucide-react'
import { useNavigate } from 'react-router';



export default function PreviewProperty(
    
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
  const property_id = localStorage.getItem('property_id')
  const navigate = useNavigate() 

  useEffect(() => {
    fetchDetailedDisplay_property(property_id,setPropertyDetails)
  }, []);

  const [activeTab, setActiveTab] = useState('overview')
  

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'rooms', label: 'Rooms' },
    { id: 'reviews', label: 'Guest Reviews' }
  ]

  return (
    <>
    <div className='flex flex-col  p-4 md:p-8 rounded-3xl bg-white shadow-xl'>
    <div className="min-h-screen ">
      {/* Hero Image */}
      <>
      <div className="relative aspect-[12/9] md:aspect-[2/1] overflow-hidden rounded-2xl">
  <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-full">
    {/* Main Thumbnail Image */}
    <div className="relative h-full md:col-span-2">
      <img
        src={`${propertyDetails?.property_details?.thumbnail_image_url}`}
        alt="Property thumbnail"
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>

    {/* Grid of Additional Images */}
    <div className="hidden md:grid grid-cols-2 gap-2 md:col-span-2">
      {propertyDetails?.property_images?.slice(0, 4).map((image, index) => (
        <div
          key={image.id}
          className="relative aspect-square overflow-hidden"
        >
          <img
            src={`${image.property_image_url}`}
            alt={`Property view ${index + 1}`}
            className="h-full w-full object-cover"
          />
          {index === 3 && (
            <button
              onClick={() => setShowAllPhotos(true)}
              className="absolute inset-0 text-sm bg-black/50 flex items-center justify-center gap-2 text-white group-hover:bg-black/60 transition-colors"
            >
              <Grid className="w-5 h-5" />
              Show all photos
            </button>
          )}
        </div>
      ))}
    </div>

    {/* Mobile Show All Button */}
    <button
      onClick={() => setShowAllPhotos(true)}
      className="md:hidden absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-black px-4 py-2 rounded-full flex items-center gap-2 shadow-lg"
    >
      <Grid className="w-4 h-4" />
      Show all
    </button>
  </div>
</div>


      {/* Full Gallery Modal */}
      {/* <Dialog open={showAllPhotos} onOpenChange={setShowAllPhotos}>
        <DialogContent className="max-w-7xl w-full h-[90vh] p-6">
          <div className="relative h-full overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {images.map((image) => (
                <div
                  key={image.id}
                  className="relative aspect-[4/3] group overflow-hidden rounded-lg"
                >
                  <img
                    src={image.property_image_url}
                    alt={`Property view - ${image.image_name}`}
                    className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog> */}
    </>
      {/* <div className="h-[400px] relative">
        <img
          src={`${propertyDetails?.property_details?.thumbnail_image_url}`}
          alt={propertyDetails?.property_details?.property_name}
          className="w-full h-full object-cover"
        />
      
      </div> */}

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
           <PD_ReviewSection propertyDetails/>
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
                  <PublishedRoomCard rooms={propertyDetails?.rooms} />
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
    </div>

    
    <div className="flex justify-center mt-8">
        <button
          onClick={()=>handlePublishingProperty(property_id, navigate)}
          className="px-6 py-2 bg-themeColor text-white rounded-xl hover:opacity-90 shadow-md"
        >
          Submit and Publish Property
        </button>
      </div>
    </>
  )
}