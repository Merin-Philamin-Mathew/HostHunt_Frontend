import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import PropertyAmenitiesForm from '../../../components/property_owner/new_listings/PropertyAmenitiesForm';

function PropertyAmenitiesPage() {
    const [canDisplayForm, setCanDisplayForm] = useState(false);
    const isPropertyDetailsComplete = useSelector(
    (state) => state.property.isPropertyDetailsComplete
  );
  const isDocumentsComplete = useSelector(
    (state) => state.property.isDocumentsComplete
  );
  const isPolicyServiceComplete = useSelector(
    (state) => state.property.isPolicyServiceComplete
  );
  

  useEffect(() => {
    if (isDocumentsComplete  && isPropertyDetailsComplete && isPolicyServiceComplete ) {
      setCanDisplayForm(true); 
    }
}, []);

  return (
    <>
      {canDisplayForm ? (
      <PropertyAmenitiesForm/>
    ) : (
        <div className="p-4 md:p-8 bg-white rounded-3xl shadow-xl">
          <h2 className="text-2xl font-bold text-red-600">Incomplete Form</h2>
          <p>Please complete all steps of the property form and upload the required documents before submitting.</p>
        </div>
      )}
    </>
  )
}

export default PropertyAmenitiesPage
