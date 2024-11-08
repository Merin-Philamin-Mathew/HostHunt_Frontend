import React, { useEffect, useState } from 'react'
import PropertyPoliciesForm from '../../../components/property_owner/new_listings/PoliciesServicesForm';
import { useSelector } from 'react-redux';

function Policy_ServicesPage() {
  const [canDisplayForm, setCanDisplayForm] = useState(false);
  const isPropertyDetailsComplete = useSelector(
  (state) => state.property.isPropertyDetailsComplete
);
const isDocumentsComplete = useSelector(
  (state) => state.property.isDocumentsComplete
);

useEffect(() => {
  if (isDocumentsComplete  && isPropertyDetailsComplete ) {
    setCanDisplayForm(true); 
  }
}, []);

return (
  <>
    {canDisplayForm ? (
    <PropertyPoliciesForm/>
  ) : (
      <div className="p-4 md:p-8 bg-white rounded-3xl shadow-xl">
        <h2 className="text-2xl font-bold text-red-600">Incomplete Form</h2>
        <p>Please complete all steps of the property form and upload the required documents before submitting.</p>
      </div>
    )}
  </>
)
}

export default Policy_ServicesPage
