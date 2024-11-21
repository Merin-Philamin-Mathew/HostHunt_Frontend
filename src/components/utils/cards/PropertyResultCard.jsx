import { Star } from 'lucide-react'
import React from 'react'
import Button from '../Button'

function PropertyResultCard({allPropertyResults}) {
  return (
    <>
      <ul>
        {allPropertyResults.map((property, index) => (
              <div
    key={property.id}
    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow my-2"
  >
    <div className="flex">
      <div className="w-1/4">
        <img
          src={property.thumbnail_image_url}
          alt={property.property_name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="w-2/3 p-4 flex flex-col">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">{property.property_name}</h3>
            <div className="flex items-center gap-1 mt-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(property.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="text-sm text-gray-600">
                ({property.reviews} Reviews)
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">1 night</div>
            <div className="text-xl font-bold text-blue-600">
              {property.price}
            </div>
            <div className="text-sm text-gray-500">
              includes taxes and fees
            </div>
          </div>
        </div>
        <p className="text-gray-600 mt-2 flex-grow">
          {property.description}
        </p>
        <div className="flex justify-end mt-4">
          <Button
            color="primary"
            className="bg-orange-500 text-white"
          >
            View Deal
          </Button>
        </div>
      </div>
    </div>
            </div>        
        ))}
      </ul>
    </>
  )
}

export default PropertyResultCard
