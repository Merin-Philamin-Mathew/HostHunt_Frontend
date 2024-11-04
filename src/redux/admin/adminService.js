import { admin_api } from "../../apis/axios";
import URLS from "../../apis/urls";
import Cookies from 'js-cookie';


export const loginAdminService = (data)=>{
    return admin_api.post(URLS.AUTHENTICATION.login,data)
}

//====================================== ADMIN PROPERTY MANAGEMENT==================================
export const adminGetPropertiesService = ({propStatus='',page=''}) =>{
    return admin_api.get(URLS.ADMINMANAGEMENT.all_properties,
        {params: { propStatus, page}}
    )
}
export const adminGetPropertiesBasicDetailsService = (property_id) =>{
    return admin_api.get(`${URLS.ADMINMANAGEMENT.basic_details}/${property_id}/`)
}
export const adminApproveOrRejectProperties = (property_id, status) => {
    const csrfToken = Cookies.get('csrftoken');
    console.log(csrfToken);
    
    return admin_api.patch(
        `${URLS.ADMINMANAGEMENT.approve_reject_property}/${property_id}/${status}/`,
    );
};

//====================================== ADMIN USER MANAGEMENT==================================
export const adminGetUserService = ({ page = 1 }) =>{
    return admin_api.get(URLS.ADMINMANAGEMENT.all_users,
        {params: {page}}
    )
}
export const adminGetOwnerService = ({ page = 1 }) =>{
    return admin_api.get(URLS.ADMINMANAGEMENT.all_owners,
        {params: {page}}
    )
}

//====================================== ADMIN PROPERTY CONFIGURATION MANAGEMENT==================================
// Amenity
// export const adminGetAmenities = () =>{
    //     return admin_api.get(URLS.ADMINMANAGEMENT.pc_amenities)
    // }
    export const adminCreateAmenitiesService = (data) =>{
        return admin_api.post(URLS.ADMINMANAGEMENT.pc_amenities,data)
    }
    export const adminListAllAmenitiesService = (page = 1, searchQuery = '') => {
        return admin_api.get(URLS.ADMINMANAGEMENT.pc_amenities, {
            params: { page, search: searchQuery || undefined }
        });
    };
    
    export const adminRetrieveAmenityService = (amenity_id) => {
        return admin_api.get(`${URLS.ADMINMANAGEMENT.pc_amenity}/${amenity_id}`);
    }
    
    export const adminUpdateAmenityService = (amenity_id, data) => {
        return admin_api.put(`${URLS.ADMINMANAGEMENT.pc_amenity}/${amenity_id}`, data);
    };
    
    export const adminPartialUpdateAmenityService = (amenity_id, data) => {
        return admin_api.patch(`${URLS.ADMINMANAGEMENT.pc_amenity}/${amenity_id}`, data);
    };
    export const adminDeleteAmenityService = (amenity_id) => {
        return admin_api.delete(`${URLS.ADMINMANAGEMENT.pc_amenity}/${amenity_id}`);
    };

// RoomFacilities services
export const adminCreateRoomFacilitiesService = (data) => {
    return admin_api.post(URLS.ADMINMANAGEMENT.pc_room_facilities, data);
};
export const adminListAllRoomFacilitiesService = (page = 1, searchQuery = '') => {
    return admin_api.get(URLS.ADMINMANAGEMENT.pc_room_facilities, {
        params: { page, search: searchQuery || undefined }
    });
};
export const adminRetrieveRoomFacilityService = (facility_id) => {
    return admin_api.get(`${URLS.ADMINMANAGEMENT.pc_room_facility}${facility_id}/`);
};
export const adminUpdateRoomFacilityService = (facility_id, data) => {
    return admin_api.put(`${URLS.ADMINMANAGEMENT.pc_room_facility}${facility_id}/`, data);
};
export const adminPartialUpdateRoomFacility = (facility_id, data) => {
    return admin_api.patch(`${URLS.ADMINMANAGEMENT.pc_room_facility}${facility_id}/`, data);
};
export const adminDeleteRoomFacilityService = (facility_id) => {
    return admin_api.delete(`${URLS.ADMINMANAGEMENT.pc_room_facility}${facility_id}/`);
};

// RoomType services
export const adminCreateRoomTypeService = (data) => {
    return admin_api.post(URLS.ADMINMANAGEMENT.pc_room_types, data);
};
export const adminListAllRoomTypesService = (page = 1, searchQuery = '') => {
    return admin_api.get(URLS.ADMINMANAGEMENT.pc_room_types, {
        params: { page, search: searchQuery || undefined }
    });
};
export const adminRetrieveRoomTypeService = (room_type_id) => {
    return admin_api.get(`${URLS.ADMINMANAGEMENT.pc_room_type}${room_type_id}/`);
};
export const adminUpdateRoomTypeService = (room_type_id, data) => {
    return admin_api.put(`${URLS.ADMINMANAGEMENT.pc_room_type}${room_type_id}/`, data);
};
export const adminPartialUpdateRoomTypeService = (room_type_id, data) => {
    return admin_api.patch(`${URLS.ADMINMANAGEMENT.pc_room_type}${room_type_id}/`, data);
};
export const adminDeleteRoomTypeService = (room_type_id) => {
    return admin_api.delete(`${URLS.ADMINMANAGEMENT.pc_room_type}${room_type_id}/`);
};

// BedType services
export const adminCreateBedTypeService = (data) => {
    return admin_api.post(URLS.ADMINMANAGEMENT.pc_bed_types, data);
};
export const adminListAllBedTypesService = (page = 1, searchQuery = '') => {
    return admin_api.get(URLS.ADMINMANAGEMENT.pc_bed_types, {
        params: { page, search: searchQuery || undefined }
    });
};
export const adminRetrieveBedTypeService = (bed_type_id) => {
    return admin_api.get(`${URLS.ADMINMANAGEMENT.pc_bed_type}${bed_type_id}/`);
};
export const adminUpdateBedTypeService = (bed_type_id, data) => {
    return admin_api.put(`${URLS.ADMINMANAGEMENT.pc_bed_type}${bed_type_id}/`, data);
};
export const adminPartialUpdateBedTypeService = (bed_type_id, data) => {
    return admin_api.patch(`${URLS.ADMINMANAGEMENT.pc_bed_type}${bed_type_id}/`, data);
};
export const adminDeleteBedTypeService = (bed_type_id) => {
    return admin_api.delete(`${URLS.ADMINMANAGEMENT.pc_bed_type}${bed_type_id}/`);
};
