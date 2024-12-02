import React, { useEffect, useState } from 'react';
import SubHeader from '../utils/SubHeader';
import Button from '../utils/Button';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import HostelCard from '../utils/cards/HostelCard';
import { getAllPropertiesOfHost } from '../../features/Property/PropertyServices';
import { Input } from '@nextui-org/react';
import { useDebounce } from '../utils/Performance/Debouncing/Debounce';
import { useDispatch } from 'react-redux';
import { resetOnboardingDetails } from '../../features/Property/PropertySlice';

const POManageListings = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchTerm = useDebounce(searchQuery, 500);
  const dispatch = useDispatch()


  const getProperties = async () => {
    try {
      const response = await getAllPropertiesOfHost(debouncedSearchTerm)
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
      toast.error('Failed to fetch properties.');
    }
  };

  useEffect(() => {
    getProperties()
    dispatch(resetOnboardingDetails)
    const keysToDelete = ['property_details', 'property_id', 'property_docs', 'property_status','property_type','rental_apartment_details','policiesData','documents','s3_file_path','amenities'];
    keysToDelete.forEach(key => localStorage.removeItem(key));
  }, [debouncedSearchTerm]);
  const handleSearchChange = (e) => setSearchQuery(e.target.value);


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
          <div className='font-semibold '>My listings</div>
        <div className='flex justify-between items-center pt-5'> 
        <Input
          classNames={{
            input: [
              "bg-white",
              "text-black/90 dark:text-white/90",
            ],
            innerWrapper: ["max-w-md"],
            inputWrapper:[            
              "shadow-xl",
              "hover:bg-white/90",
              "max-w-md",

            ]
          }}
          placeholder="Search by status, name, type, location..."
          value={searchQuery}
          onChange={handleSearchChange}
        />

           <Button {...buttonProps} />
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
