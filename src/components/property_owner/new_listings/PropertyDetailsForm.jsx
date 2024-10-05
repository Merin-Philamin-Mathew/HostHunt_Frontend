import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { owner_api } from '../../../apis/axios';
import URLS from '../../../apis/urls';


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

const PropertyDetailsForm = () => {
  return (
    <Formik
      initialValues={{
        property_name: '',
        property_type: '',
        city: '',
        address: '',
        postcode: '',
        thumbnail_image: null,
        total_bed_rooms: '',
        no_of_beds: '',
      }}
      validationSchema={PropertyDetailsSchema}
      onSubmit={ async (values) => {
        console.log('property_detials',values);
        const token = localStorage.getItem('owner_access_token');
        console.log('Owner access token:', token);
        const response = await owner_api.post(URLS.NEWLISTING['property_details'], {values})
        console.log('Response data:', response.data);
        
      }}
    >
      {({ setFieldValue, errors, touched }) => (
        <Form className="flex flex-col gap-6 p-4 md:p-8 top-[1000px] rounded-3xl bg-white shadow-xl ">
          <div className="grid gap-6 xl:grid-cols-2">
            <div>
              <label htmlFor="property_name" className="block text-h5 font-heading">Property Name</label>
              <Field 
                name="property_name" 
                className="w-full p-2 border border-gray-300 focus:ring-1 focus:ring-themeColor2 focus:outline-none  shadow-md rounded-xl" 
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
                className="w-full p-2 border border-gray-300 focus:ring-1 focus:ring-themeColor2 focus:outline-none  shadow-md rounded-xl"
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
                className="w-full p-2 border border-gray-300 focus:ring-1 focus:ring-themeColor2 focus:outline-none  shadow-md rounded-xl" 
                placeholder="City "
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
                className="w-full p-2 border border-gray-300 focus:ring-1 focus:ring-themeColor2 focus:outline-none  shadow-md rounded-xl" 
              />
              {errors.postcode && touched.postcode && (
                <div className="text-error text-small">{errors.postcode}</div>
              )}
            </div>
            <div>
              <label htmlFor="address" className="block text-h5 font-heading">Address</label>
              <Field 
                name="address" 
                className="w-full p-2 border border-gray-300 focus:ring-1 focus:ring-themeColor2 focus:outline-none  shadow-md rounded-xl" 
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
                className="w-full p-2 border border-gray-300 focus:ring-1 focus:ring-themeColor2 focus:outline-none  shadow-md rounded-xl"
              />
              {errors.thumbnail_image && touched.thumbnail_image && (
                <div className="text-error text-small">{errors.thumbnail_image}</div>
              )}
            </div>

            <div>
              <label htmlFor="total_bed_rooms" className="block text-h5 font-heading">Total Bedrooms</label>
              <Field 
                name="total_bed_rooms" 
                type="number" 
                className="w-full p-2 border border-gray-300 focus:ring-1 focus:ring-themeColor2 focus:outline-none  shadow-md rounded-xl" 
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
                className="w-full p-2 border border-gray-300 focus:ring-1 focus:ring-themeColor2 focus:outline-none  shadow-md rounded-xl" 
              />
              {errors.no_of_beds && touched.no_of_beds && (
                <div className="text-error text-small ">{errors.no_of_beds}</div>
              )}
            </div>
          </div>
          
          <button type="submit" className="px-6 py-2 mt-4 bg-themeColor text-white font-accent rounded-xl shadow-md hover:b-rounded-xlg-opacity-90">
            Save Changes
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default PropertyDetailsForm;
