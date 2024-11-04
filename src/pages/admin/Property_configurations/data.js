import * as Yup from 'yup'

// =====================================PROPERTY AMENITIES===================================
// Yup Schema
export const PropertyAmenities_YupSchemas =  Yup.object().shape({
    amenity_name: Yup.string().required('Amenity name is required'),
})

// Initial Values
export const PropertyAmenities_InitialValues = {
    amenity_name: '', amenity_type: '', icon: '', is_active: true 
}
// 
// =====================================PROPERTY FACILITIES===================================
// Yup Schema for RoomFacilities
export const RoomFacilities_YupSchemas = Yup.object().shape({
    facility_name: Yup.string().required('Facility name is required'),
    is_active: Yup.boolean()
});

// Initial Values for RoomFacilities
export const RoomFacilities_InitialValues = {
    facility_name: '',
    icon: '',
    is_active: true
};

// =====================================ROOM TYPE===================================
// Yup Schema for RoomType
export const RoomTypes_YupSchemas = Yup.object().shape({
    room_type_name: Yup.string().required('Room type name is required'),
    is_active: Yup.boolean()
});

// Initial Values for RoomType
            
export const RoomTypes_InitialValues = {
    room_type_name: '',
    icon: '',
    is_active: true
};

// =====================================BED TYPE===================================
// Yup Schema for BedType
export const BedTypes_YupSchemas = Yup.object().shape({
    bed_type_name: Yup.string().required('Bed type name is required'),
    is_active: Yup.boolean()
});

// Initial Values for BedType
export const BedTypes_InitialValues = {
    bed_type_name: '',
    icon: '',
    is_active: true
};
