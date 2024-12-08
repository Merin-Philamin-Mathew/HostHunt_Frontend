import { Star } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router';

function PropertyResultCard({ allPropertyResults }) {
  const propertyTypeLabels = {
    pg: 'PG',
    hostel: 'Hostel',
    apartment: 'Apartment',
    rental: 'Rental',
  };

  const navigate = useNavigate();

  const navigatePropertyDisplayPage = (propertyName,property_id) => {
    navigate(`/hosteldetails?hostel=${encodeURIComponent(propertyName)}`);
    localStorage.setItem('property_id',property_id)
  };

  return (
    <div className="grid gap-4">
      {allPropertyResults?.map((property) => (
        <div
          key={property?.id}
          onClick={() => navigatePropertyDisplayPage(property?.property_name,property.id)}
          className="bg-white rounded-lg  shadow-md overflow-hidden hover:shadow-lg transition-shadow my-2 cursor-pointer"
        >
          <div className="flex">
            {/* Thumbnail Image */}
            <div className="w-1/4 ">
              {property.thumbnail_image_url ? (
                <img
                  src={property.thumbnail_image_url}
                  alt={property.property_name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}
            </div>

            {/* Property Details */}
            <div className=" p-4 flex flex-col">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">
                    {property.property_name}
                  </h3>
                  <div className="flex items-center gap-1 mt-1">
                    {/* Rating */}
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(property.rating || 0)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-600">
                      ({property.reviews || 0} Reviews)
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-gray-500 text-sm mt-2 flex-grow">
                {propertyTypeLabels[property.property_type] || 'Unknown'}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PropertyResultCard;
