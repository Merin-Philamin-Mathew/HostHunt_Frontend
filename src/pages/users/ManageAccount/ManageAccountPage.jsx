import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FaBed, FaCheckCircle, FaImages } from 'react-icons/fa';
import { resetOnboardingDetails } from '../../../features/Property/PropertySlice';
import { BsBuildingCheck, BsFillBookmarkCheckFill } from 'react-icons/bs';
import { fetchPropertyImages } from '../../../features/Property/PropertyActions';
import UserGeneralFormsLayout from '../../../components/Layouts/User/UserGeneralFormLayout';
import { MdAccountCircle } from 'react-icons/md';
import { IoPersonSharp } from "react-icons/io5";


function ManageAccountPage() {
  const dispatch = useDispatch();

  const updateSidebarState = () => {
    // dispatch(setRoomDetailsComplete(!!localStorage.getItem('property_details')));
  };
  
//   useEffect(() => {
//     updateSidebarState();

//     const handleStorageChange = () => {
//       updateSidebarState();
//     };
//     window.addEventListener('storage', handleStorageChange);
    
//     return () =>{ 
//       window.removeEventListener('storage', handleStorageChange)
      
//       dispatch(resetOnboardingDetails());

//     };
//   }, []);



  
  const sidebarItems = [
       { title: 'Manage Account', link: '/manage-account/manage-account', icon: <IoPersonSharp/>       },
       { title: 'My Stays', link: '/manage-account/my-stays', icon: <FaBed/> },
  ]
  return (
    <UserGeneralFormsLayout sidebarItems={sidebarItems}/>
    // <GeneralFormsLayout/>
  )
}

export default ManageAccountPage
