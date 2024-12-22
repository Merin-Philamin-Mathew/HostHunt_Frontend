import { Grid } from 'lucide-react'
import React from 'react'

function PropertyDisplayImageSection({propertyDetails}) {
  return (
    <div className="relative overflow-hidden rounded-2xl mt-1">
    <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
      {/* Main Thumbnail Image */}
      <div class="relative h-[51vh] overflow-hidden md:col-span-8">
        <img
          src={`${propertyDetails?.property_details?.thumbnail_image_url}`}
          alt="Property thumbnail"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
  
      {/* Grid of Additional Images */}
      <div className="hidden md:grid grid-cols-2 gap-2 md:col-span-4">
        {propertyDetails?.property_images?.slice(0, 4).map((image, index) => (
          <div
            key={image.id}
            className="relative h-[25vh] overflow-hidden"
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
  )
}

export default PropertyDisplayImageSection
