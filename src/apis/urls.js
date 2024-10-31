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
        'policies_services':'property/new-listing/policies-services',
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
    },
    ADMINMANAGEMENT: {
        'all_properties':'property/all-properties',
        'basic_details':'property/basic-details',
        'approve_reject_property':'admin/property/approval',

        'all_users':'admin/users',
        'all_owners':'admin/owners',

        'pc_amenities':'admin/amenities',
        'pc_amenity`':'admin/amenity`',
    },

}

export default URLS