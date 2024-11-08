import React from 'react';
import { FaChevronDown } from "react-icons/fa";

function PropertyAmenitiesDisplay({ propertyAmenities }) {  // Destructure directly here
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {propertyAmenities?.map((amenity, index) => (
        <div key={index} className="relative group">
          <div className="flex items-center space-x-2">
            <FaChevronDown className="text-green-500" />
            <span>{amenity.amenity_name}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PropertyAmenitiesDisplay;
