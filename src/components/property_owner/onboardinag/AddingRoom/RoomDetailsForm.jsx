import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from "sonner";
import { createRoomDetails } from '../../../../features/Property/PropertyServices';
import { useDispatch } from 'react-redux';
import { fetchActiveBedTypes, fetchActiveRoomTypes } from '../../../../features/Property/PropertyActions';

// Validation schema using Yup
const RoomDetailsFormSchema = Yup.object().shape({
    room_type: Yup.string().required('Room type is required'),
    is_private: Yup.boolean().required('Please specify if the room is private or shared'),
    occupancy: Yup.number()
      .required('Occupancy is required')
      .positive('Occupancy must be a positive number')
      .integer('Occupancy must be an integer'),
    no_of_rooms: Yup.number()
      .required('Number of rooms/beds is required')
      .positive('Must be a positive number')
      .integer('Must be an integer'),
    booking_amount_choice: Yup.string().required('Booking amount choice is required'),
    price_per_night: Yup.number()
      .nullable()
      .when('booking_amount_choice', {
        is: 'price_per_night',
        then: (schema) => schema
          .required('Price per night is required')
          .positive('Must be a positive number')
          .max(99999999.99, 'Ensure that there are no more than 8 digits before the decimal point'),
        otherwise: (schema) => schema.notRequired(),
      }),
    monthly_rent: Yup.number()
      .nullable()
      .when('booking_amount_choice', {
        is: 'monthly_rent',
        then: (schema) => schema
          .required('Monthly rent is required')
          .positive('Must be a positive number')
          .max(99999999.99, 'Ensure that there are no more than 8 digits before the decimal point'),
        otherwise: (schema) => schema.notRequired(),
      }),
    bed_type: Yup.string().required('Bed type is required'),
    area: Yup.number()
      .required('Area is required')
      .positive('Must be a positive number')
      .integer('Must be an integer'),
    description: Yup.string(),
  });
  

// Form component
const RoomDetailsForm = ({ setRooms,onSubmit }) => {
  const dispatch = useDispatch();
  const [roomTypes, setRoomTypes] = useState([])
  const [bedTypes, setBedTypes] = useState([])

  useEffect(()=>{
    fetchActiveRoomTypes(setRoomTypes)
    fetchActiveBedTypes(setBedTypes)
  },[])

  return (
    <Formik
      initialValues={{
        room_type: '',
        is_private: false,
        occupancy: '',
        no_of_rooms: '',
        booking_amount_choice: '',
        price_per_night: '',
        monthly_rent: '',
        bed_type: '',
        area: '',
        description: '',
      }}
      validationSchema={RoomDetailsFormSchema}
      onSubmit={async (values, { setSubmitting }) => {
        const property = parseInt(localStorage.getItem('property_id'), 10);
        setSubmitting(true);
    
        try {
            const response = await createRoomDetails({ ...values, property });
            toast.success('Room details submitted successfully');
    
            const private_text = values.is_private ? 'Private' : 'Shared';
            const room_name = `${values.occupancy} ${values.bed_type} ${private_text} ${values.room_type}`;
    
            setRooms((prevRooms) => [
                ...prevRooms,
                { ...values, room_name }
            ]);
        } catch (error) {
            if (error.response && error.response.data) {
                console.error(error.response.data);
                const errorField = Object.keys(error.response.data)[0];
                const errorMessage = error.response.data[errorField][0];
                toast.error(`Error with ${errorField}: ${errorMessage}`);
            } else {
                toast.error('An unexpected error occurred. Please try again later.');
            }
        } finally {
            setSubmitting(false);
        }
    }}
        >
      {({ isSubmitting }) => (
        <Form className="flex flex-col gap-6 p-4 md:p-8 rounded-3xl bg-white shadow-xl">

          

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField name="room_type" label="Room Type" component="select">
              <option value="">Select Room Type</option>
              {roomTypes.map((roomType) => (
                <option key={roomType.id} value={roomType.id}>{roomType.room_type_name}</option>
              ))}
            </FormField>
            <div className="flex items-center">
              <Field type="checkbox" name="is_private" className="mr-2" />
              <label>Private Room</label>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <FormField
              name="no_of_rooms"
              label="Number of Rooms"
              type="number"
              placeholder="Enter the total number of rooms of this type in your property"
            />
            <FormField
              name="occupancy"
              label="Occupancy"
              type="number"
              placeholder="Enter the total occupancy for all rooms of this type"
            />
          </div>
          <FormField name="booking_amount_choice" label="Booking Amount Choice" component="select">
            <option value="">Select</option>
            <option value="price_per_night">Price per night</option>
            <option value="monthly_rent">Monthly Rent</option>
          </FormField>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField name="price_per_night" label="Price per Night" type="number" />
            <FormField name="monthly_rent" label="Monthly Rent" type="number" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField name="bed_type" label="Bed Type" component="select">
              <option value="">Select Bed Type</option>
              {bedTypes.map((bedType) => (
                <option key={bedType.id} value={bedType.id}>{bedType.bed_type_name}</option>
              ))}
            </FormField>
            <FormField name="area" label="Area (sq ft)" type="number" />
          </div>
          <FormField name="description" label="Description" component="textarea" />
          <button
            type="submit"
            className="px-6 py-2 mt-4 bg-themeColor text-white font-accent rounded-xl shadow-md hover:opacity-90"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Add Room'}
          </button>
        </Form>
      )}
    </Formik>
  );
};

const FormField = ({ name, label, type = 'text', component = 'input', ...props }) => (
  <div className="flex flex-col gap-2">
    <label htmlFor={name} className="text-h5 font-heading">
      {label}
    </label>
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

export default RoomDetailsForm;
