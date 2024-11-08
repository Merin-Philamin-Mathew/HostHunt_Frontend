import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from "sonner";
import { replace, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { createRentalApartmentDetails, reviewAndSubmitSteps_ChangeStatus } from '../../../features/Property/PropertyServices';

// Validation Schema
export const RentalApartmentSchema = Yup.object().shape({
  buildup_area: Yup.number().required('Buildup Area is required').positive('Buildup Area must be positive'),
  property_age: Yup.number(),
  monthly_rent: Yup.number().required('Monthly Rent is required'),
  booking_amount: Yup.number(),
  available_from: Yup.date().required('Available From is required'),
  floor_num: Yup.number(),
  rooms: Yup.string(),
  water_supply: Yup.boolean(),
  gas_pipeline: Yup.boolean(),
  furnishing_status: Yup.string().required('Furnishing Status is required'),
  furnishings: Yup.string(),
});

const RentalApartmentForm = () => {
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    buildup_area: '',
    property_age: '',
    monthly_rent: '',
    booking_amount: '',
    available_from: '',
    floor_num: '',
    rooms: '',
    water_supply: false,
    gas_pipeline: false,
    furnishing_status: '',
    furnishings: '',
  });
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    console.log('Component mounted');
    const storedRentalApartmentDetails = localStorage.getItem('rental_apartment_details');
    if (storedRentalApartmentDetails) {
      setInitialValues(JSON.parse(storedRentalApartmentDetails));
    }
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={RentalApartmentSchema}
      enableReinitialize
      onSubmit={async (values, { setSubmitting }) => {
        console.log('Form submission triggered',values);
        try {
          setSubmitting(true);
          setLoading(true);
          const property = localStorage.getItem('property_id');

          const response = await createRentalApartmentDetails({...values,property});
          console.log('Response data:', response.data);
          setLoading(false);
          setSubmitting(false);

          localStorage.setItem('rental_apartment_details', JSON.stringify(response.data));
          toast.success('Rental apartment details successfully saved');

        try {
            const response = await reviewAndSubmitSteps_ChangeStatus(property,'published')
            localStorage.setItem('property_status','published');
        }catch(error){
            console.error(error);  
        }
          navigate('/host/new-listing/',{replace:true});
        } catch (error) {
          console.error('Error:', error);
          setLoading(false);
          setSubmitting(false);
          if (error.response && error.response.data) {
            if (error.response.data.error) {
              toast.error(error.response.data.error);
            } else {
              const errorField = Object.keys(error.response.data)[0];
              const errorMessage = error.response.data[errorField][0];
              toast.error(`Error with ${errorField}: ${errorMessage}`);
            }
          } else {
            toast.error('An unexpected error occurred. Please try again later.');
          }
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col gap-6 p-4 md:p-8 rounded-3xl bg-white shadow-xl">
          <FormField name="buildup_area" label="Buildup Area (sq. ft.)" type="number" />
          <FormField name="property_age" label="Property Age (years)" type="number" />
          <FormField name="monthly_rent" label="Monthly Rent" type="number" />
          <FormField name="booking_amount" label="Booking Amount" type="number" />
          <FormField name="available_from" label="Available From" type="date" />
          <FormField name="floor_num" label="Floor Number" type="number" />
          <FormField name="rooms" label="Rooms" placeholder="Kitchen-1, Bed Room-3, Hall-1, Dining-1...." />
          
          <div className="flex justify-around items-center">
            <label>
              <Field name="water_supply" type="checkbox" className="mr-2" />
              Water Supply
            </label>
            <label>
              <Field name="gas_pipeline" type="checkbox" className="mr-2" />
              Gas Pipeline
            </label>
          </div>

          <FormField name="furnishing_status" label="Furnishing Status" component="select">
            <option value="">Select Status</option>
            <option value="fully">Fully Furnished</option>
            <option value="semi">Semi Furnished</option>
            <option value="unfurnished">Unfurnished</option>
          </FormField>

          <FormField name="furnishings" label="Furnishings" placeholder="Fridge-1, Air Conditioner-1, TV-1, Induction Cooker-1...." />

          <button
            type="submit"
            className="px-6 py-2 mt-4 bg-themeColor text-white font-accent rounded-xl shadow-md hover:opacity-90"
            disabled={isSubmitting || isLoading}
          >
            {isLoading ? 'Saving...' : 'Submit And Publish Your Property'}
          </button>
        </Form>
      )}
    </Formik>
  );
};

const FormField = ({ name, label, type = 'text', component = 'input', ...props }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-h5 font-heading">{label}</label>
    <Field
      name={name}
      type={type}
      component={component}
      className="w-full p-2 border border-gray-300 focus:ring-1 focus:ring-themeColor2 focus:outline-none shadow-md rounded-xl"
      {...props}
    />
    <ErrorMessage name={name} component="div" className="text-error text-small" />
  </div>
);

export default RentalApartmentForm;
