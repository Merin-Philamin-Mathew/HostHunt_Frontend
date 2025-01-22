import React, { useEffect, useState } from 'react';
import SubHeader from '../../components/utils/SubHeader';
import Button from '../../components/utils/Button';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import HostelCard from '../../components/utils/cards/HostelCard';
import { getAllPropertiesOfHost } from '../../features/Property/PropertyServices';
import { Input } from '@nextui-org/react';
import { useDebounce } from '../../components/utils/Performance/Debouncing/Debounce';
import { useDispatch } from 'react-redux';
import { resetOnboardingDetails } from '../../features/Property/PropertySlice';
import { toast } from 'react-toastify'; // Assuming you're using react-toastify for notifications
import POHostelListingCardSkeleton from '../../components/utils/skeleton/POHostelLisitngCardSkeleton';
import EmptyListings from '@/components/property_owner/hostels_listed/EmptyLisitngs';

const POManageListings = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchTerm = useDebounce(searchQuery, 500);
  const dispatch = useDispatch();

  const getProperties = async () => {
    setIsLoading(true); // Set loading to true before fetching
    try {
      const response = await getAllPropertiesOfHost(debouncedSearchTerm);
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
      toast.error('Failed to fetch properties.');
    } finally {
      setIsLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    getProperties();
    dispatch(resetOnboardingDetails());
    const keysToDelete = ['property_details', 'property_id', 'property_docs', 'property_status', 'property_type', 'rental_apartment_details', 'policiesData', 'documents', 's3_file_path', 'amenities'];
    keysToDelete.forEach(key => localStorage.removeItem(key));
  }, [debouncedSearchTerm]);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleAddListing = () => {
    localStorage.setItem('property_status', 'in_progress');
    localStorage.setItem('property_docs', 0);
    navigate('/host/manage-listings/');
  };

  const buttonProps = {
    icon: <FaPlus />, 
    title: 'Add Listings',
    onClick: handleAddListing,
    bg_color: 'bg-gray-200',
  };

  return (
    <>
        <div className="max-w-6xl mx-auto">
          
        <SubHeader 
          title="My Listings" 
          buttonProps={buttonProps} 
        />

        <>
        <div className='flex justify-between gap-8'>
           {/* Search Input */}
            <div className="mb-4 flex-auto">
            <Input 
              placeholder="Search listings" 
              value={searchQuery}
              onChange={handleSearchChange}
              classNames={{
                inputWrapper: [
                  "hover:bg-black",
                  "shadow-xl",
                  "hover:placeholder:bg-black ",
    
                  "dark:hover:bg-default/70",
                  "group-data-[focus=true]:bg-default-200/50",
                  "dark:group-data-[focus=true]:bg-default/60",
                  "!cursor-t ext",
                ],
              input: [
                "placeholder:text-default-700/50 ",            
    
              ],
              innerWrapper: "bg-transparent",
          
    
              }}
            />
          </div>
  
        <Button {...buttonProps}/>
  
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading 
           ?  <>{
            Array(6).fill().map((_, index) => (
                <POHostelListingCardSkeleton key={index} />
              ))
            }
              </>
            :properties.length > 0 ?  properties.map((property, index) => (
                  <HostelCard key={property.id} property={property} />
                ))
            :   
            <div className="col-span-full text-center text-gray-500">
              <EmptyListings onAddListing={handleAddListing}/>
            </div>
          }
        </div>
        </>
      
 
    </div>
    
    </>
  );
};

export default POManageListings;