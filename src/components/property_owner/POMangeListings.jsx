import React from 'react';
import HostelCard from '../cards/HostelCard';
import { useSelector } from 'react-redux';
import SubHeader from '../utils/SubHeader';
import Button from '../utils/Button';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router';

const POManageListings = () => {
  const { owner_name } = useSelector((state) => state.owner);
  const navigate = useNavigate();


  const hostels = [
    { imageUrl: '/images/hostel1.jpg', name: 'Select Beach House', location: 'Junction, Townside', listingDate: '26 February 2024' },
    { imageUrl: '/images/hostel2.jpg', name: 'Select Beach House', location: 'Junction, Townside', listingDate: '26 February 2024' },
    { imageUrl: '/images/hostel2.jpg', name: 'Select Beach House', location: 'Junction, Townside', listingDate: '26 February 2024' },
    { imageUrl: '/images/hostel3.jpg', name: 'Select Beach House', location: 'Junction, Townside', listingDate: '26 February 2024' }
  ];
  const handleAddListing = () => {
    // Navigate to the page for adding new listings
    navigate('/host/new-listing'); // change the path to your target route
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
        <div className="grid md:grid-cols-2 grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 g-4">
          {hostels.map((hostel, index) => (
            <HostelCard key={index} {...hostel} />
          ))}
        </div>
      </div>
      
      </>
    
  );
};

export default POManageListings;
