import React, { useEffect } from 'react'
import GeneralFormsLayout from '../../../components/Layouts/Owner/GeneralFormsLayout'
import { useDispatch, useSelector } from 'react-redux';
import { FaBed } from 'react-icons/fa';
import { setRoomDetailsComplete } from '../../../features/Property/PropertySlice';

function OnboardingPage() {
  const dispatch = useDispatch();
  
  const isRoomDetails = useSelector(
    (state) => state.property.isRoomDetails
  );

  const updateSidebarState = () => {
    dispatch(setRoomDetailsComplete(!!localStorage.getItem('property_details')));
  };
  
  useEffect(() => {
    updateSidebarState();

    const handleStorageChange = () => {
      updateSidebarState();
    };
    window.addEventListener('storage', handleStorageChange);
    
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  
  const sidebarItems = [
       { title: 'Room', link: '/host/new-listing/finish', icon: <FaBed/> , disabled: false  },
  ]
  return (
    <GeneralFormsLayout sidebarItems={sidebarItems}/>
  )
}

export default OnboardingPage
