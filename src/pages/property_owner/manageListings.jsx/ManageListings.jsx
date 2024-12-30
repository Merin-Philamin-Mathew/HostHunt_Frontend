import React, { useEffect } from 'react'
import GeneralFormsLayout from '../../../components/Layouts/Owner/GeneralFormsLayout'
import { useDispatch, useSelector } from 'react-redux';
import { FaBed, FaBuilding, FaCheckCircle, FaImages, FaShieldAlt, FaWifi } from 'react-icons/fa';
import { resetOnboardingDetails } from '../../../features/Property/PropertySlice';
import { BsBuildingCheck, BsFillBookmarkCheckFill } from 'react-icons/bs';
import { fetchPropertyImages } from '../../../features/Property/PropertyActions';

function ManageListingsPage() {
  const dispatch = useDispatch();

  const updateSidebarState = () => {
    // dispatch(setRoomDetailsComplete(!!localStorage.getItem('property_details')));
  };
  
  useEffect(() => {
    updateSidebarState();

    const handleStorageChange = () => {
      updateSidebarState();
    };
    window.addEventListener('storage', handleStorageChange);
    
    return () =>{ 
      window.removeEventListener('storage', handleStorageChange)
      
      dispatch(resetOnboardingDetails());

    };
  }, []);



  
  const sidebarItems = [
        { title: 'Property Details', link: '/host/manage-listing/property-details', icon: <FaBuilding />,  },
        { title: 'Policies & Services', link: '/host/manage-listing/policies&services', icon: <FaShieldAlt />,},
        { title: 'Facilities', link: '/host/manage-listing/facilities', icon: <FaWifi /> },
        { title: 'Room', link: '/host/manage-listing/room/', icon: <FaBed/> },
        { title: 'Property Images', link: '/host/manage-listing/property-images/', icon: <FaImages/>  },
        { title: 'Preview', link: '/host/manage-listing/finish/', icon: <BsFillBookmarkCheckFill />   },
  ]
  return (
    <GeneralFormsLayout sidebarItems={sidebarItems}/>
  )
}

export default ManageListingsPage
