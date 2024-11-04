import React, { useEffect, useState } from 'react';
import VerifiedProperties from '../../../components/admin/properties/VerifiedProperties';
import InReviewProperties from '../../../components/admin/properties/InReviewProperties';
import RejectedProperties from '../../../components/admin/properties/RejectedProperties';
import { SearchBar } from '../../../components/admin/properties/PropertySearchBar';
import { adminGetPropertiesService } from '../../../redux/admin/adminService';
import PublishedProperties from '../../../components/admin/properties/PublishedProperties';
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

const PropertyListPage = () => {
  const [propStatus, setPropStatus] = useState('published');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [response, setResponse] = useState(null); 
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {  
        const res = await adminGetPropertiesService({ propStatus, page });   
        setResponse(res?.data);       
      } catch (error) {
        console.error('Error fetching properties:', error);
      }

      setLoading(false);
    };

    fetchProperties();
  }, [propStatus, page]); 

  const itemsPerPage = 5; 
  const totalPages = Math.ceil(response?.count / itemsPerPage) || 1;  
  const filteredProperties = response?.results?.filter(property =>
    Object.values(property).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  ) || [];

  const renderPropertiesComponent = () => {
    switch (propStatus) {
      case 'verified':
        return <VerifiedProperties data={filteredProperties} />;
      case 'in_review':
        return <InReviewProperties data={filteredProperties} />;
      case 'rejected':
        return <RejectedProperties data={filteredProperties} />;
      case 'published':
        return <PublishedProperties data={filteredProperties} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className='flex-1 overflow-auto p-9 bg-slate-800 md:rounded-lg h-full flex flex-col'>
        <div className="mb-6 flex flex-wrap gap-4">
          <FilterButton
            label="Published"
            isActive={propStatus === 'published'}
            onClick={() => setPropStatus('published')}
          />
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

        <div className="mb-6">
          <SearchBar onSearch={setSearchTerm} />
        </div>

        <div className="flex-grow overflow-y-auto">
          {loading ? (
            <div className='flex justify-center'>
              <p className='text-white'>Loading properties...</p>
            </div>
          ) : (
            renderPropertiesComponent()
          )}
        </div>

        <div className="mt-auto">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>
    </>
  );
};

export default PropertyListPage;
