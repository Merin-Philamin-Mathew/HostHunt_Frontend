import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { fetchActiveBedTypes, fetchActiveRoomTypes } from '../../../../features/Property/PropertyActions';
import { RoomDetailsFormSchema } from '../onboarding_data';
import { setRoomDetails } from '../../../../features/Property/PropertySlice';

const RoomDetailsForm = ({ setRooms, onSubmit }) => {
  const dispatch = useDispatch();
  const [roomTypes, setRoomTypes] = useState([]);
  const [bedTypes, setBedTypes] = useState([]);

  // Get Redux state
  const roomDetailsForm = useSelector((state) => state.property.RoomDetails);

  // Load Room Types and Bed Types
  useEffect(() => {
    fetchActiveRoomTypes(setRoomTypes);
    fetchActiveBedTypes(setBedTypes);
  }, []);

  // Get initial values from Redux or defaults
  const getInitialValues = () => {
    return roomDetailsForm || {
      room_type: '',
      is_private: false,
      no_of_beds: '',
      no_of_rooms: '',
      // booking_amount_choice: '',
      // price_per_night: '',
      monthly_rent: '',
      booking_amount: '',
      bed_type: '',
      area: '',
      description: '',
      room_name: '', // Initialize empty
    };
  };

  return (
    <Formik
      initialValues={getInitialValues()}
      validationSchema={RoomDetailsFormSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        try {
          // Submission logic
          dispatch(setRoomDetails({}));
          onSubmit(values); // Pass final values
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, values, setFieldValue }) => {
        // Sync form values with Redux
        useEffect(() => {
          dispatch(setRoomDetails(values));
        }, [values, dispatch]);

        // Dynamically update room_name when related fields change
        useEffect(() => {
          const privateText = values.is_private ? 'Private' : '';
          const roomTypeName = roomTypes.find((type) => type.id === parseInt(values.room_type))?.room_type_name || '';
          const bedTypeName = bedTypes.find((type) => type.id === parseInt(values.bed_type))?.bed_type_name || '';

          const roomName = `${privateText} ${roomTypeName} (${values.no_of_beds > 1 ? values.no_of_beds : ''} ${bedTypeName} ${values.no_of_beds > 'Beds' ? values.no_of_beds : 'Bed'})`.trim();
          setFieldValue('room_name', roomName);
        }, [values.no_of_beds, values.bed_type, values.is_private, values.room_type, roomTypes, bedTypes, setFieldValue]);

        return (
          <Form className="flex flex-col gap-6 p-4 md:p-8 rounded-3xl bg-white shadow-xl">
            {
           values.room_type &&
              <div className='opacity-60 '>
            <FormField name="room_name" label="Room Name" type="text" disabled />
            </div>
            }
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField name="room_type" label="Room Type" component="select">
                <option value="">Select Room Type</option>
                {roomTypes.map((roomType) => (
                  <option key={roomType.id} value={roomType.id}>
                    {roomType.room_type_name}
                  </option>
                ))}
              </FormField>
              <FormField name="bed_type" label="Bed Type" component="select">
                <option value="">Select Bed Type</option>
                {bedTypes.map((bedType) => (
                  <option key={bedType.id} value={bedType.id}>
                    {bedType.bed_type_name}
                  </option>
                ))}
              </FormField>
              <div className="flex items-center py-2">
                <Field type="checkbox" name="is_private" className="mr-2 " />
                <label>Private Room</label>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <FormField
                name="no_of_beds"
                label="Number of Beds"
                type="number"
                placeholder="Enter the total number of beds in this room"
              />
              <FormField
                name="no_of_rooms"
                label="Number of Rooms"
                type="number"
                placeholder="Number of rooms with this specific type and bed configuration (e.g., Mixed Dorm with 4 beds and Mixed Dorm with 8 beds are separate room types)"
                />
            </div>
            {/* <FormField name="booking_amount_choice" label="Booking Amount Choice" component="select">
              <option value="">Select</option>
              <option value="price_per_night">Price per night</option>
              <option value="monthly_rent">Monthly Rent</option>
            </FormField> */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* <FormField name="price_per_night" label="Price per Night" type="number" /> */}
              <FormField name="monthly_rent" label="Monthly Rent" type="number" />
              <FormField name="booking_amount" label="Booking Amount" type="number" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <FormField name="area" label="Area (sq ft)" type="number" />
            </div>
            <FormField name="description" label="Description" component="textarea" />
            
            {/* <button
              type="submit"
              disabled={isSubmitting}
              className="bg-themeColor2 text-white px-4 py-2 rounded-lg"
            >
              Submit
            </button> */}
          </Form>
        );
      }}
    </Formik>
  );
};


// Reusable FormField Component
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
