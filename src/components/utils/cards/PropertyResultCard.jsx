import React from 'react';
import { Star } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useNavigate } from 'react-router';

const PropertyCard = ({ property = ''}) => {
  const {
    property_name,
    property_type,
    address,
    city,
    thumbnail_image_url,
    total_bed_rooms,
    no_of_beds,
    is_private,
    gender_restriction,
    avg_rating,
    total_reviews,
    caution_deposit
  } = property;
 const navigate = useNavigate ();
  const navigatePropertyDisplayPage = (propertyName,property_id) => {
    console.log('property_id',property_id,propertyName,'property_name');
    localStorage.setItem('property_id',property_id);
    
    navigate(`/hosteldetails?hostel=${encodeURIComponent(propertyName)}`);
  }

  const formatGenderRestriction = (restriction) => {
    return restriction.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <Card className="w-full max-w-sm hover:shadow-lg transition-shadow duration-300">
      <div className="relative"
        onClick={() => navigatePropertyDisplayPage(property?.property_name,property?.id)}

      >
        <img
          src={thumbnail_image_url || "/api/placeholder/400/300"}
          alt={property_name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-sm font-medium">
          {gender_restriction !== 'no_restriction' && (
            <span className="text-blue-600">
              {formatGenderRestriction(gender_restriction)}
            </span>
          )}
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold line-clamp-1">{property_name}</h3>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
            <span className="text-sm font-medium">
              {avg_rating ? `${avg_rating} (${total_reviews})` : 'New'}
            </span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm text-gray-600 line-clamp-1">{address}, {city}</p>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">
              {is_private ? 'Private Property' : `${total_bed_rooms} Rooms • ${no_of_beds} Beds`}
            </span>
            <span className="font-medium">
              ₹{caution_deposit.toLocaleString()} deposit
            </span>
          </div>
          
          <div className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
            {property_type.charAt(0).toUpperCase() + property_type.slice(1)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Container component to display multiple property cards
const PropertyDispalyCardUserSide = ({ properties }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};

export default PropertyDispalyCardUserSide;