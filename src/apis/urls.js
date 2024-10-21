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
        'submit_review':'property/new-listing/submit_review',
        // doc of single property
        'property_documents':'property/documents',
    },

    HOSTMANAGEMENT: {
        'host_properties':'/property/host-properties/',
    },
    ADMINMANAGEMENT: {
        'all_properties':'property/all-properties',
        'basic_details':'property/basic-details',
        'approve_reject_property':'admin/property/approval'
    },

}

export default URLS