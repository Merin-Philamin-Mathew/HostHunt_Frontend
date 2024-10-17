import React, { useEffect, useState } from 'react';
import VerifiedProperties from '../../../components/admin/properties/VerifiedProperties';
import InReviewProperties from '../../../components/admin/properties/InReviewProperties';
import RejectedProperties from '../../../components/admin/properties/RejectedProperties';
import { SearchBar } from '../../../components/admin/properties/PropertySearchBar';
import { adminGetPropertiesService } from '../../../redux/admin/adminService';
import Pagination from '../../../components/utils/pagination/Pagination';

const FilterButton = ({ label, isActive, onClick }) => (
  <button
    className={`px-4 py-2 rounded-md ${
      isActive ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
    }`}
    onClick={onClick}
  >
    {label}
  </button>
);

const PropertyList = () => {
  const [propStatus, setPropStatus] = useState('verified');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [response, setResponse] = useState(null); 
  const [loading, setLoading] = useState(false); 

  // Fetch data based on propStatus and page number
  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        console.log(propStatus,"fffff",page);
        
        const res = await adminGetPropertiesService({ propStatus, page });
        console.log(res?.data?.results,'response');
        
        setResponse(res?.data);
       
        
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
      setLoading(false);
    };

    fetchProperties();
  }, [propStatus, page]); // Trigger fetch on propStatus or page number change

  const itemsPerPage = 4;  // Define how many items you want to show per page
  const totalPages = Math.ceil(response?.count / itemsPerPage) || 1;  // Fallback if response is undefined

  // Filter properties based on search term
  const filteredProperties = response?.results?.filter(property =>
    Object.values(property).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  ) || [];

  const renderPropertiesComponent = () => {
    console.log(';;;',response,',,',filteredProperties);
    
    switch (propStatus) {
      case 'verified':
        return <VerifiedProperties data={filteredProperties} />;
      case 'in_review':
        return <InReviewProperties data={filteredProperties} />;
      case 'rejected':
        return <RejectedProperties data={filteredProperties} />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* Filter Buttons */}
      <div className="mb-6 flex flex-wrap gap-4">
        <FilterButton
          label="Verified"
          isActive={propStatus === 'verified'}
          onClick={() => setPropStatus('verified')}
        />
        <FilterButton
          label="In review"
          isActive={propStatus === 'in_review'}
          onClick={() => setPropStatus('in_review')}
        />
        <FilterButton
          label="Rejected"
          isActive={propStatus === 'rejected'}
          onClick={() => setPropStatus('rejected')}
        />
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <SearchBar onSearch={setSearchTerm} />
      </div>

      {/* Loading State */}
      {loading ? (
        <p className=''>Loading properties...</p>
      ) : (
        <>
          {/* Render Properties */}
          {renderPropertiesComponent()}

          {/* Pagination Component */}
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}  // Change page number when user interacts with pagination
          />
        </>
      )}
    </>
  );
};

export default PropertyList;
