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
        <div className="absolute top-0 right-0 bg-red-600 p-4">
          <img
            src=''
            alt="Zostel"
            className="h-8"
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
    {/* Tabs */}
<div className="sticky top-0 bg-white z-10 border-b mb-8">
  <div className="flex gap-8 px-4 py-2">
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
                <section  ref={overviewRef}>
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

                <section  ref={roomsRef}>
                  <h2 className="text-xl font-semibold mb-4">Available rooms</h2>
                  <div className="space-y-4">
                  <PublishedRoomCard rooms={propertyDetails?.rooms}/>
                  </div>
                </section>
                <section>
                <div ref={reviewsRef} className="mt-8">
                  <h2 className="text-xl font-semibold mb-4">Guest Reviews</h2>
                  <p>No reviews yet</p>
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