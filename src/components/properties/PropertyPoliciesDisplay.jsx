import React from 'react';

function PropertyPoliciesDisplay({ propertyData }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <p><strong>Check-in Time:</strong> {propertyData?.check_in_time || 'Not specified'}</p>
        <p><strong>Check-out Time:</strong> {propertyData?.check_out_time || 'Not specified'}</p>
        <p><strong>Smoking:</strong> {propertyData.smoking === 'no' ? 'Not Allowed' : propertyData?.smoking || 'Not specified'}</p>
        <p><strong>Pets:</strong> {propertyData.pets_permit ? 'Allowed' : 'Not Allowed'}</p>
        <p><strong>Drinking:</strong> {propertyData.drinking_permit ? 'Allowed' : 'Not Allowed'}</p>
        <p><strong>Visitors:</strong> {propertyData.visitors ? 'Allowed' : 'Not Allowed'}</p>
        <p>
          <strong>Cancellation:</strong> 
          {propertyData.cancellation_period === 0 
            ? 'No free cancellation ' 
            : `Free up to ${propertyData.cancellation_period} days before check-in`}
        </p>
      </div>
      <div>
        <p><strong>Child Permit:</strong> {propertyData.child_permit ? `Allowed (Ages ${propertyData?.child_from_age} to ${propertyData?.child_to_age})` : 'Not Allowed'}</p>
        <p><strong>Curfew:</strong> {propertyData.curfew ? `From ${propertyData?.curfew_from_time} to ${propertyData?.curfew_to_time}` : 'No Curfew'}</p>
        <p><strong>Stay Duration:</strong> {propertyData?.min_nights ? `${propertyData.min_nights} - ${propertyData.max_nights} nights` : 'No restrictions'}</p>
        <p><strong>Gender Restriction:</strong> {propertyData?.gender_restriction || 'None'}</p>
        <p><strong>Caution Deposit:</strong> Rs.{propertyData.caution_deposit || 'Not specified'}</p>
      </div>
    </div>
  );
}

export default PropertyPoliciesDisplay;
