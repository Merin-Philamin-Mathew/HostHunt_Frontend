import React, { useEffect, useState } from 'react';
import SubHeader from '../utils/SubHeader';
import Button from '../utils/Button';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import HostelCard from '../utils/cards/HostelCard';
import { getAllPropertiesOfHost } from '../../features/Property/PropertyServices';

const POManageListings = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);

  const getProperties = async () => {
    try {
      const response = await getAllPropertiesOfHost()
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
      toast.error('Failed to fetch properties.');
    }
  };
  console.log(properties,'lllllll')
  useEffect(() => {
    getProperties()
    const keysToDelete = ['property_details', 'property_id', 'property_docs', 'property_status','s3_file_path'];
    keysToDelete.forEach(key => localStorage.removeItem(key));

  }, []);

  const hostels = [
    { imageUrl: '/images/hostel1.jpg', name: 'Select Beach House', location: 'Junction, Townside', listingDate: '26 February 2024' },
    { imageUrl: '/images/hostel2.jpg', name: 'Select Beach House', location: 'Junction, Townside', listingDate: '26 February 2024' },
    { imageUrl: '/images/hostel2.jpg', name: 'Select Beach House', location: 'Junction, Townside', listingDate: '26 February 2024' },
    { imageUrl: '/images/hostel3.jpg', name: 'Select Beach House', location: 'Junction, Townside', listingDate: '26 February 2024' }
  ];
  const handleAddListing = () => {
    localStorage.setItem('property_status','in_progress')
    localStorage.setItem('property_docs',0)
    navigate('/host/new-listing/'); 
  };
  const buttonProps = {
    title: 'Add Listings',
    icon: <FaPlus />,
    onClick: handleAddListing,
    bg_color: 'bg-gray-200',
};
  return (
    <>

      {/* Main Content */}
      <div className="flex-grow  " >
        <SubHeader/>
        <div className='flex justify-between items-center pb-5'> 
          <div className='font-semibold '>My listings</div>
          <div className='pr-4'>
           <Button {...buttonProps} />
          </div>
           </div>
        {/* Hostel Listings */}
        <div className="grid md:grid-cols-2 grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 gap-5">
          {properties.map((property, index) => (
            <HostelCard key={index} property={property} />
          ))}
        </div>
      </div>
      
      </>
    
  );
};

export default POManageListings;
