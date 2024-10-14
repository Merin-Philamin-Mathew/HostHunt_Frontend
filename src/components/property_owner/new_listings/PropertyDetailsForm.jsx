import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { api } from '../../../apis/axios';
import URLS from '../../../apis/urls';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const PropertyDetailsForm = () => {
  const navigate = useNavigate();

  // State for initial form values
  const [initialValues, setInitialValues] = useState({
    property_name: '',
    property_type: '',
    city: '',
    address: '',
    postcode: '',
    thumbnail_image: null,
    total_bed_rooms: '',
    no_of_beds: '',
  });

  useEffect(() => {
    const storedPropertyDetails = localStorage.getItem('property_details');
    console.log('propertyDetailsform useEffect');
    

    if (storedPropertyDetails) {
      const propertyDetails = JSON.parse(storedPropertyDetails);

      console.log('dfsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsd',propertyDetails);
      

      // Update initial values with fetched data from local storage
      setInitialValues({
        property_name: propertyDetails.property_name || '',
        property_type: propertyDetails.property_type || '',
        city: propertyDetails.city || '',
        address: propertyDetails.address || '',
        postcode: propertyDetails.postcode || '',
        total_bed_rooms: propertyDetails.total_bed_rooms || '',
        no_of_beds: propertyDetails.no_of_beds || '',
        thumbnail_image: propertyDetails.thumbnail_image || '', // Load the image path
      });
    }
  }, []);

  const PropertyDetailsSchema = Yup.object().shape({
    property_name: Yup.string().required('Property Name is required'),
    property_type: Yup.string().required('Property Type is required'),
    city: Yup.string().required('City is required'),
    address: Yup.string().required('Address is required'),
    postcode: Yup.number().required('Postcode is required').integer('Invalid postcode'),
    thumbnail_image: Yup.mixed().required('Thumbnail Image is required'),
    total_bed_rooms: Yup.number().required('Total Bedrooms is required').integer(),
    no_of_beds: Yup.number().required('Number of Beds is required').integer(),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={PropertyDetailsSchema}
      enableReinitialize 
      onSubmit={async (values) => {
        console.log('property_details', values);
        try {
          const storedPropertyId = localStorage.getItem('property_id');
          const formData = new FormData();
          
          // Append all fields to formData including the image file
          for (const key in values) {
            formData.append(key, values[key]);
          }
    
          let response;
          if (storedPropertyId) {
            // Update existing property
            console.log('====================================');
            
            response = await api.put(`${URLS.NEWLISTING['property_details']}/${storedPropertyId}/`, formData, {
              headers: { 'Content-Type': 'multipart/form-data' },
            });
          } else {
            console.log('//////////////////////////////');
            // Create new property
            response = await api.post(URLS.NEWLISTING['property_details'], formData, {
              headers: { 'Content-Type': 'multipart/form-data' },
            });
          }
    
          console.log('Response data:', response.data);
          
          const thumbnailFilename = response?.data?.data?.thumbnail_image
    
          // Save the property details with the image filename
          const updatedPropertyDetails = {
            ...values,
            thumbnail_image: thumbnailFilename
          };
    
          localStorage.setItem('property_details', JSON.stringify(updatedPropertyDetails));
          localStorage.setItem('property_id', response?.data?.property_id);
          toast.success('Property details successfully saved');
          navigate('/host/new-listing/documents');
        } catch (e) {
          console.log('error', e);
        
          if (e.response && e.response.data) {
            // Check for non-field errors (general errors not tied to a specific field)
            if (e.response.data.non_field_errors) {
              toast.error(e.response.data.non_field_errors[0]);
            }
            
            // Check for thumbnail image errors
            else if (e.response.data.thumbnail_image) {
              toast.error('Please upload a valid image file.');
            }
        
            // Handle other field-specific errors
            else {
              // Get the first field that has an error
              const errorField = Object.keys(e.response.data)[0];
        
              // If there are any errors for that field, toast the first error message
              if (e.response.data[errorField] && e.response.data[errorField].length > 0) {
                toast.error(`Error with ${errorField}: ${e.response.data[errorField][0]}`);
              } else {
                // Fallback for unexpected errors
                toast.error('An unexpected error occurred. Please try again later.');
              }
            }
          } else {
            // If no response data is available, toast a generic error message
            toast.error('An unexpected error occurred. Please try again later.');
          }
        }
      }}
    >
      {({ setFieldValue, errors, touched }) => (
        <Form className="flex flex-col gap-6 p-4 md:p-8 rounded-3xl bg-white shadow-xl ">
          <div className="grid gap-6 xl:grid-cols-2">
            <div>
              <label htmlFor="property_name" className="block text-h5 font-heading">Property Name</label>
              <Field 
                name="property_name" 
                className="w-full p-2 border border-gray-300 focus:ring-1 focus:ring-themeColor2 focus:outline-none shadow-md rounded-xl" 
              />
              {errors.property_name && touched.property_name && (
                <div className="text-error text-small">{errors.property_name}</div>
              )}
            </div>

            <div>
              <label htmlFor="property_type" className="block text-h5 font-heading">Property Type</label>
              <Field 
                name="property_type" 
                as="select" 
                className="w-full p-2 border border-gray-300 focus:ring-1 focus:ring-themeColor2 focus:outline-none shadow-md rounded-xl"
              >
                <option value="">Select Type</option>
                <option value="pg">PG</option>
                <option value="rental">Rental</option>
                <option value="hostel">Hostel</option>
                <option value="apartment">Apartment</option>
              </Field>
              {errors.property_type && touched.property_type && (
                <div className="text-error text-small">{errors.property_type}</div>
              )}
            </div>

            <div>
              <label htmlFor="city" className="block text-h5 font-heading">City</label>
              <Field 
                name="city" 
                className="w-full p-2 border border-gray-300 focus:ring-1 focus:ring-themeColor2 focus:outline-none shadow-md rounded-xl" 
                placeholder="City"
              />
              {errors.city && touched.city && (
                <div className="text-error text-small">{errors.city}</div>
              )}
            </div>

            <div>
              <label htmlFor="postcode" className="block text-h5 font-heading">Postcode</label>
              <Field 
                name="postcode" 
                type="number" 
                className="w-full p-2 border border-gray-300 focus:ring-1 focus:ring-themeColor2 focus:outline-none shadow-md rounded-xl" 
              />
              {errors.postcode && touched.postcode && (
                <div className="text-error text-small">{errors.postcode}</div>
              )}
            </div>

            <div>
              <label htmlFor="address" className="block text-h5 font-heading">Address</label>
              <Field 
                name="address" 
                className="w-full p-2 border border-gray-300 focus:ring-1 focus:ring-themeColor2 focus:outline-none shadow-md rounded-xl" 
                placeholder="Full address of your property"
              />
              {errors.address && touched.address && (
                <div className="text-error text-small">{errors.address}</div>
              )}
            </div>

            <div>
              <label htmlFor="thumbnail_image" className="block text-h5 font-heading">Thumbnail Image</label>
              <input
                name="thumbnail_image"
                type="file"
                onChange={(event) => setFieldValue('thumbnail_image', event.currentTarget.files[0])}
                className="w-full p-2 border border-gray-300 focus:ring-1 focus:ring-themeColor2 focus:outline-none shadow-md rounded-xl"
              />
              {/* {initialValues.thumbnail_image && (
                <img 
                  src={`${URLS.BASE_URL}${initialValues.thumbnail_image}`} 
                  alt="Thumbnail Preview" 
                  className="mb-4 h-20 w-20" 
                />
              )} */}

              {errors.thumbnail_image && touched.thumbnail_image && (
                <div className="text-error text-small">{errors.thumbnail_image}</div>
              )}
            </div>

            <div>
              <label htmlFor="total_bed_rooms" className="block text-h5 font-heading">Total Bedrooms</label>
              <Field 
                name="total_bed_rooms" 
                type="number" 
                className="w-full p-2 border border-gray-300 focus:ring-1 focus:ring-themeColor2 focus:outline-none shadow-md rounded-xl" 
              />
              {errors.total_bed_rooms && touched.total_bed_rooms && (
                <div className="text-error text-small">{errors.total_bed_rooms}</div>
              )}
            </div>

            <div>
              <label htmlFor="no_of_beds" className="block text-h5 font-heading">Number of Beds</label>
              <Field 
                name="no_of_beds" 
                type="number" 
                className="w-full p-2 border border-gray-300 focus:ring-1 focus:ring-themeColor2 focus:outline-none shadow-md rounded-xl" 
              />
              {errors.no_of_beds && touched.no_of_beds && (
                <div className="text-error text-small ">{errors.no_of_beds}</div>
              )}
            </div>
          </div>

          <button type="submit" className="px-6 py-2 mt-4 bg-themeColor text-white font-accent rounded-xl shadow-md hover:opacity-90">
            Save Changes
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default PropertyDetailsForm;
