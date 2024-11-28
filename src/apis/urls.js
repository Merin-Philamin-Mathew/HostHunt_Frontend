const URLS = {
    AUTHENTICATION: {
        'register':'auth/register/',
        'otp':'auth/otp-verification/',
        'login':'auth/login/',
        'google-login':'/auth/google-login/'     
    },

    NEWLISTING: {
        'property_details':'property/new-listing/property-details',
        'documents':'property/new-listing/documents',
        'facilities':'property/new-listing/facilities',
        'policies_services':'property/new-listing/{property_id}/policies/',
        'retrievORcreate_amenities_by_property':'/property/new-listing/{property_id}/amenities/bulk/',
        'submit_review':'property/new-listing/submit-review',
        // doc of single property
        'property_documents':'property/documents',
    },
    
    ONBOARDING: {
        'rental_appartement':'property/onboarding/rental-appartment/',
        'rooms':'property/onboarding/rooms/',       
    },
    
    HOSTMANAGEMENT: {
        'host_properties':'/property/host-properties/',
        'room_by_property':'/property/property-rooms',
        'policies_by_property':'/property/get-policies-services',
    },
    FETCHINGMANAGEMENT: {
        'hh_all_amenities':'/property/all-amenities/',
        'hh_active_room_facilities':'/property/active-room-facilities/',
        'hh_active_room_types':'/property/active-room-types/',
        'hh_active_bed_types':'/property/active-bed-types/',
        
        'hh_all_property_results':'/property/property-results/',
        'hh_published_property_display':'property/property-display-view/'
    },
    ADMINMANAGEMENT: {
        'all_properties':'property/all-properties',
        'basic_details':'property/basic-details',
        'approve_reject_property':'admin/property/approval',

        'all_users':'admin/users',
        'all_owners':'admin/owners',

        'pc_amenities':'admin/amenities',
        'pc_amenity':'admin/amenity', //to retrieve, update, delete specific amenity

        'pc_room_facilities': 'admin/room-facilities/',
        'pc_room_facility': 'admin/room-facility/',  // to retrieve, update, delete specific room facility
    
        'pc_room_types': 'admin/room-types/',
        'pc_room_type': 'admin/room-type/',  // to retrieve, update, delete specific room type
    
        'pc_bed_types': 'admin/bed-types/',
        'pc_bed_type': 'admin/bed-type/',  // to retrieve, update, delete specific bed type
    
    },

}

export default URLS