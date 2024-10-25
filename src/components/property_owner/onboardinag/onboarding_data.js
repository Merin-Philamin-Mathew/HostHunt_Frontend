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
