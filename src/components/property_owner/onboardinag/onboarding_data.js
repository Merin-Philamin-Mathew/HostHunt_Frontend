import * as Yup from 'yup';

export const RentalApartmentSchema = Yup.object().shape({
    property_name: Yup.string().required('Property Name is required'),
    property_type: Yup.string().required('Property Type is required'),
    city: Yup.string().required('City is required'),
    address: Yup.string().required('Address is required'),
    postcode: Yup.number().required('Postcode is required').integer('Invalid postcode'),
    thumbnail_image: Yup.mixed(),
    total_bed_rooms: Yup.number().required('Total Bedrooms is required').integer(),
    no_of_beds: Yup.number().required('Number of Beds is required').integer(),
    buildup_area: Yup.number().required('Buildup Area is required').positive('Buildup Area must be positive'),
    furnishing_status: Yup.string().required('Furnishing Status is required'),
    water_supply: Yup.boolean(),
    gas_pipeline: Yup.boolean(),
});


export const RoomDetailsFormSchema = Yup.object().shape({
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
