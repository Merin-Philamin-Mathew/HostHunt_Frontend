import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { api } from '../../../apis/axios';
import URLS from '../../../apis/urls';
import { useSelector } from 'react-redux';

const ReviewAndSubmitPage = () => {
  const navigate = useNavigate();
  
  const [initialValues, setInitialValues] = useState({
    property_name: '',
    property_type: '',
    city: '',
    address: '',
    postcode: '',
    total_bed_rooms: '',
    no_of_beds: '',
    documents_count: 0 
  });

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
  const isPropertyAmenitiesComplete = useSelector(
    (state) => state.property.isPropertyAmenitiesComplete
  );

  useEffect(() => {
    const storedPropertyDetails = localStorage.getItem('property_details');
    const documentsCount = parseInt(localStorage.getItem('property_docs'), 10) || 0;

    if (isDocumentsComplete && isPropertyAmenitiesComplete && isPropertyDetailsComplete && isPolicyServiceComplete ) {
      setCanDisplayForm(true); 
    }

    if (storedPropertyDetails) {
      const propertyDetails = JSON.parse(storedPropertyDetails);
      setInitialValues({
        ...propertyDetails,
        documents_count: documentsCount,
      });
    }
  }, []);

  const handleSubmit = async () => {
    try {
      const storedPropertyId = localStorage.getItem('property_id');
      
      if (!storedPropertyId) {
        toast.error('Property ID not found');
        return;
      }

      // Mock API call to finalize the submission process
      await api.post(`${URLS.NEWLISTING['submit_review']}/${storedPropertyId}/in_review/`);
      
      // Navigate to host listings
      localStorage.setItem('property_status', 'in_review');
      navigate('/host/manage-listings', { replace: true });
      toast.success('Property successfully submitted!');
      
    } catch (error) {
      toast.error('An error occurred during submission');
      console.error('Error submitting review:', error);
    }
  };

  return (
    <>
      {canDisplayForm ? (
        <Formik
          initialValues={initialValues}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {({ values }) => (
            <Form className="flex flex-col gap-6 p-4 md:p-8 rounded-3xl bg-white shadow-xl">
              <h2 className="text-2xl font-bold">Review Your Property</h2>

              <div className="grid gap-6 lg:grid-cols-2">
                <div>
                  <label className="block text-h5 font-semibold">Property Name</label>
                  <p>{values.property_name}</p>
                </div>

                <div>
                  <label className="block text-h5 font-semibold">Property Type</label>
                  <p>{values.property_type}</p>
                </div>

                <div>
                  <label className="block text-h5 font-semibold">City</label>
                  <p>{values.city}</p>
                </div>

                <div>
                  <label className="block text-h5 font-semibold">Address</label>
                  <p>{values.address}</p>
                </div>

                <div>
                  <label className="block text-h5 font-semibold">Postcode</label>
                  <p>{values.postcode}</p>
                </div>

                <div>
                  <label className="block text-h5 font-semibold">Total Bedrooms</label>
                  <p>{values.total_bed_rooms}</p>
                </div>

                <div>
                  <label className="block text-h5 font-semibold">Number of Beds</label>
                  <p>{values.no_of_beds}</p>
                </div>

                <div>
                  <label className="block text-h5 font-semibold">Number of Documents Uploaded</label>
                  <p>{values.documents_count}</p>
                </div>
              </div>

              <button type="submit" className="px-6 py-2 mt-4 bg-themeColor text-white font-accent rounded-xl shadow-md hover:opacity-90">
                Submit Review
              </button>
            </Form>
          )}
        </Formik>
      ) : (
        <div className="p-4 md:p-8 bg-white rounded-3xl shadow-xl">
          <h2 className="text-2xl font-bold text-red-600">Incomplete Form</h2>
          <p>Please complete all steps of the property form and upload the required documents before submitting.</p>
        </div>
      )}
    </>
  );
};

export default ReviewAndSubmitPage;
