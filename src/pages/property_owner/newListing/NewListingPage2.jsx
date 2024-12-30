import React, { useEffect } from 'react'
import { setDocumentsComplete, setPolicyServiceComplete, setPropertyAmenitiesComplete, setPropertyDetailsComplete } from '../../../features/Property/PropertySlice';
import { useDispatch, useSelector } from 'react-redux';
import { FaFile, FaCheckCircle, FaBuilding, FaBed, FaShieldAlt } from 'react-icons/fa';
import GeneralFormsLayout from '../../../components/Layouts/Owner/GeneralFormsLayout';


function  NewListingPage2() {
    const dispatch = useDispatch();
  
    const isPropertyDetailsComplete = useSelector(
      (state) => state.property.isPropertyDetailsComplete
    );
    const isDocumentsComplete = useSelector(
      (state) => state.property.isDocumentsComplete
    );
    const isPolicyServiceComplete = useSelector(
      (state) => state.property.isPolicyServiceComplete
    );
    const isPropertyAmenitiesComplete = useSelector(
      (state) => state.property.isPropertyAmenitiesComplete
    );
  
    const updateSidebarState = () => {
      dispatch(setPropertyDetailsComplete(!!localStorage.getItem('property_details')));

      const propertyDocs = parseInt(localStorage.getItem('property_docs'), 10);    
      dispatch(setDocumentsComplete(propertyDocs>0));

      const policiesData = JSON.parse(localStorage.getItem('policiesData'));
      dispatch(setPolicyServiceComplete(!!(policiesData && policiesData?.check_in_time)));
      
      const amenities = JSON.parse(localStorage.getItem('amenities'));
      dispatch(setPropertyAmenitiesComplete(amenities?.amenities_ids>0));
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
      { title: 'Property Details', link: '/host/new-listing/property-details', icon: <FaBuilding />, disabled: false },
      { title: 'Documents', link: '/host/new-listing/documents', icon: <FaFile />, disabled: !isPropertyDetailsComplete },
      { title: 'Policies & Services', link: '/host/new-listing/policies&services', icon: <FaShieldAlt />, disabled: !isDocumentsComplete },
      { title: 'Facilities', link: '/host/new-listing/facilities', icon: <FaBed />, disabled: !isPolicyServiceComplete },
      { title: 'Finish', link: '/host/new-listing/finish', icon: <FaCheckCircle />, disabled: !isPropertyAmenitiesComplete  },
    ]
  return (
   <GeneralFormsLayout sidebarItems={sidebarItems}/>
  )
}

export default NewListingPage2
