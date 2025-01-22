import React, { useEffect, useRef, useState } from 'react';
import { Formik, Form, Field } from 'formik';

import { api } from '../../../apis/axios';
import URLS from '../../../apis/urls';
import { toast } from "sonner";
import { replace, useNavigate } from 'react-router-dom';
import { PropertyDetailsSchema } from './new_listing_data';

import { FaEdit } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { setPropertyDetailsComplete } from '../../../features/Property/PropertySlice';
import LocationField from './LocationField';


const PropertyDetailsForm = () => {
  const dispatch = useDispatch();


  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [thumbnailPreview, setThumbnailPreview] = useState('');
  const [property_id, setProperty_id] = useState('');
  const [isLoading, setLoading] = useState(false)

  const handleEditImgpopUp = (event,setFieldValue)=>{
    const file = event.currentTarget.files[0];
    
    setFieldValue('thumbnail_image', file);
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setThumbnailPreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }


  const [initialValues, setInitialValues] = useState({
    property_type: '',
    property_name: '',
    city: '',
    address: '',
    postcode: '',
    thumbnail_image: null,
    thumbnail_image_url: '',
    total_bed_rooms: '',
    no_of_beds: '',
    lat:'',
    lng:'',
    location:'',
  });

  useEffect(() => {
    console.log('propertyDetailsform useEffect');
    const storedPropertyDetails = localStorage.getItem('property_details');
    const storedPropertyId = localStorage.getItem('property_id');
    if (storedPropertyId)[
      setProperty_id(storedPropertyId)
    ]

    if (storedPropertyDetails) {
      const propertyDetails = JSON.parse(storedPropertyDetails);
      setThumbnailPreview(propertyDetails.thumbnail_image_url)
      console.log('property details from localstorage',propertyDetails);

      setInitialValues({
        property_name: propertyDetails.property_name || '',
        property_type: propertyDetails.property_type || '',
        city: propertyDetails.city || '',
        address: propertyDetails.address || '',
        postcode: propertyDetails.postcode || '',
        total_bed_rooms: propertyDetails.total_bed_rooms || '',
        no_of_beds: propertyDetails.no_of_beds || '',
        thumbnail_image_url: propertyDetails.thumbnail_image_url || '',
        lat: propertyDetails.lat || '',
        lng: propertyDetails.lng || '',
        location: propertyDetails.location || '',
      });
    }
    console.log('initial details from localstorage', initialValues);

  }, []);



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
          
          for (const key in values) {
            formData.append(key, values[key]);
          }
          let response;
          if (storedPropertyId) {
            // Update existing property
            setLoading(true)
            console.log('====================================');
            response = await api.put(`${URLS.NEWLISTING['property_details']}${storedPropertyId}/`, formData, {
              headers: { 'Content-Type': 'multipart/form-data' },
            });
            setLoading(false)
            navigate('/host/manage-listing/policies&services', {replace:true});

          } else {
            console.log('=================**mmm***===================');
            setLoading(true)
            response = await api.post(`${URLS.NEWLISTING['property_details']}`, formData, {
              headers: { 'Content-Type': 'multipart/form-data' },
            });
            setLoading(false)
            
            dispatch(setPropertyDetailsComplete(true));
            navigate('/host/new-listing/documents', {replace:true});

          }

          const updatedPropertyDetails = {
            ...response.data.data,
          };
    
          localStorage.setItem('property_details', JSON.stringify(updatedPropertyDetails));
          localStorage.setItem('property_id', response?.data?.property_id);
          toast.success('Property details successfully saved');
        } catch (e) {
          console.log('error', e);
        
          if (e.response && e.response.data) {
            if (e.response.data.non_field_errors) {
              toast.error(e.response.data.non_field_errors[0]);
            }
            
            else if (e.response.data.thumbnail_image) {
              toast.error('Please upload a valid image file.');
            }
        
            else {
              const errorField = Object.keys(e.response.data)[0];
        
              // If there are any errors for that field, toast the first error message
              if (e.response.data[errorField] && e.response.data[errorField].length > 0) {
                toast.error(`Error with ${errorField}: ${e.response.data[errorField][0]}`);
              } else {
                toast.error('An unexpected error occurred. Please try again later.');
              }
            }
          } else {
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
          
             </div>
             <div>
            <label htmlFor="location" className="block text-h5 font-heading">Property Location</label>
            <LocationField 
              setFieldValue={setFieldValue} 
            />
            {/* Move error display here for better accessibility */}
            {errors.location && touched.location && (
              <div className="text-error text-sm mt-1">{errors.location}</div>
            )}
          </div>

          {/* Hidden fields for lat/lng */}
          <Field type="hidden" name="lat" />
          <Field type="hidden" name="lng" />
            <div className="grid gap-6 xl:grid-cols-2">
         

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
                  type="text" 
                  className="w-full p-2 border border-gray-300 focus:ring-1 focus:ring-themeColor2 focus:outline-none shadow-md rounded-xl" 
                />
                {errors.postcode && touched.postcode && (
                  <div className="text-error text-small">{errors.postcode}</div>
                )}
              </div>
            
          </div>
          <div className="grid gap-6 xl:grid-cols-2">

          <div>
            <label htmlFor="address" className="block text-h5 font-heading">Address</label>
            <Field 
              name="address" 
              as="textarea" 
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
                hidden={!!property_id}
                onChange={(event) => handleEditImgpopUp(event, setFieldValue)}
                className="w-full p-2 border border-gray-300 focus:ring-1 focus:ring-themeColor2 focus:outline-none shadow-md rounded-xl"
              />
            {thumbnailPreview && (
            <div className="flex justify-center rounded-lg shadow-md border py-3">
              <div className="relative">
              <img
            src={thumbnailPreview}
            alt="Thumbnail Preview"
            className="h-20 w-20"
          />
                <div className="absolute top-0 right-0 text-white h-full w-full flex items-center justify-center opacity-0 hover:opacity-100 bg-[#535353c4]"  >
                  <button
                    type="button"
                    onClick={() => fileInputRef.current.click()} 
                    className=" rounded-full p-1 shadow-lg "
                  >
                    <FaEdit/>
                  </button>
                  <input
            ref={fileInputRef} 
            name="thumbnail_image"
            type="file"
            hidden
            onChange={(event) => handleEditImgpopUp(event, setFieldValue)}
            className="w-full p-2 border border-gray-300 focus:ring-1 focus:ring-themeColor2 focus:outline-none shadow-md rounded-xl"
          />

                </div>
              </div>
            </div>
          )}
              {errors.thumbnail_image && touched.thumbnail_image && (
                <div className="text-error text-small">{errors.thumbnail_image}</div>
              )}
            </div>
            </div>
           <div className="grid gap-6 xl:grid-cols-2">


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


























