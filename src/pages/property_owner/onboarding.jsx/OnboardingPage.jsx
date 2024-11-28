import React, { useEffect } from 'react'
import GeneralFormsLayout from '../../../components/Layouts/Owner/GeneralFormsLayout'
import { useDispatch, useSelector } from 'react-redux';
import { FaBed, FaImages } from 'react-icons/fa';
import { resetOnboardingDetails } from '../../../features/Property/PropertySlice';

function OnboardingPage() {
  const dispatch = useDispatch();
  
  const isRoomDetails = useSelector(
    (state) => state.property.isRoomDetails
  );

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
  
  // const sidebarItems = [
  //      { title: 'Room', link: '/host/onboarding/room/', icon: <FaBed/> , disabled: false  },
  //      { title: 'Property Images', link: '/host/onboarding/property-images/', icon: <FaImages/> , disabled: false  },
  // ]
  return (
    // <GeneralFormsLayout sidebarItems={sidebarItems}/>
    <GeneralFormsLayout/>
  )
}

export default OnboardingPage
