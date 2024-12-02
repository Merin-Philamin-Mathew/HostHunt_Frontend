import React, { useEffect } from 'react'
import GeneralFormsLayout from '../../../components/Layouts/Owner/GeneralFormsLayout'
import { useDispatch, useSelector } from 'react-redux';
import { FaBed, FaCheckCircle, FaImages } from 'react-icons/fa';
import { resetOnboardingDetails } from '../../../features/Property/PropertySlice';
import { BsBuildingCheck, BsFillBookmarkCheckFill } from 'react-icons/bs';
import { fetchPropertyImages } from '../../../features/Property/PropertyActions';

function OnboardingPage() {
  const dispatch = useDispatch();
  const property_id = localStorage.getItem('property_id');

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
       { title: 'Room', link: '/host/onboarding/room/', icon: <FaBed/> , disabled: false  },
       { title: 'Property Images', link: '/host/onboarding/property-images/', icon: <FaImages/> , disabled: false  },
       { title: 'Review', link: '/host/onboarding/finish/', icon: <BsFillBookmarkCheckFill /> , disabled: false  },
  ]
  return (
    <GeneralFormsLayout sidebarItems={sidebarItems}/>
    // <GeneralFormsLayout/>
  )
}

export default OnboardingPage
