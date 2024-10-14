import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api } from '../../../apis/axios';
import URLS from '../../../apis/urls';

const ReviewAndSubmitPage = () => {
  const navigate = useNavigate();
  
  // Initial form values
  const [initialValues, setInitialValues] = useState({
    property_name: '',
    property_type: '',
    city: '',
    address: '',
    postcode: '',
    total_bed_rooms: '',
    no_of_beds: '',
    documents_count: 0 // for storing the number of uploaded documents
  });

  useEffect(() => {
    const storedPropertyDetails = localStorage.getItem('property_details');
    const documentsCount =localStorage.getItem('property_docs'); // Assuming you have a way to calculate number of documents

    if (storedPropertyDetails) {
      const propertyDetails = JSON.parse(storedPropertyDetails);
      setInitialValues({
        ...propertyDetails,
        documents_count: documentsCount,  // update with real document count
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
      ;
       const keysToDelete = ['property_details', 'property_id','property_docs','property_status'];

        keysToDelete.forEach(key => localStorage.removeItem(key));

      // Navigate to host listings
      localStorage.setItem('property_status','in_review')
      navigate('/host/new-listing', { replace: true });
      toast.success('Property successfully submitted!');
      
    } catch (error) {
      toast.error('An error occurred during submission');
      console.error('Error submitting review:', error);
    }
  };

  return (
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
  );
};

export default ReviewAndSubmitPage;
