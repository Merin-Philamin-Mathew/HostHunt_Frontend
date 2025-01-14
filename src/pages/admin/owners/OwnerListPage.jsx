import React, { useEffect, useState } from 'react';
import { SearchBar } from '../../../components/admin/properties/PropertySearchBar';
import { adminGetOwnerService, adminGetUserService } from '../../../redux/admin/adminService';
import Pagination from '../../../components/utils/pagination/Pagination';
import { useNavigate } from 'react-router-dom';
import { Table } from '../../../components/utils/tables/Table';

const OwnerListPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [response, setResponse] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  // Fetch data based on page number
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await adminGetOwnerService({ page });
        setResponse(res?.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
      setLoading(false);
    };

    fetchUsers();
  }, [page]); 

  const itemsPerPage = response?.page_size || 6; 
  const totalPages = Math.ceil(response?.count / itemsPerPage) || 1;  

  const filteredUsers = response?.results?.filter(user =>
    Object.values(user).some(value =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  ) || [];

  const columns = [
    { key: 'name', label: 'User Name' },
    { key: 'email', label: 'Email' },
    {
      key: 'is_active', label: 'Active User',
      render: (row) => (
        <div>
          <button className={row.is_active_owner ? "text-green-600" : "text-red-600"}>
            {row.is_listed ? "Active" : "Inactive"}
          </button>
        </div>
      ),
    },
    {
      key: 'action',
      label: 'Action',
      render: (row) => (
        <div className="flex items-center space-x-2">
        <button className={`${row.is_active_owner ? 'bg-red-600' : 'bg-green-600'} py-1 px-3 rounded-md`}>
  {row.is_active_owner ? 'Block' : 'Unblock'}
</button>

        </div>
      ),
    },
  ];

  return (
    <div className='flex-1 overflow-auto p-9 bg-slate-800 md:rounded-lg h-full flex flex-col'>
      <div className="mb-6">
        <SearchBar onSearch={setSearchTerm} />
      </div>
        <div  className="flex-grow overflow-y-auto"> 
                {loading ? (
                    <div className='flex justify-center h-3/5'>
                    <p className='text-white'>Loading users...</p>
                    </div>
                ) : (
                    <>
                    <Table data={filteredUsers} columns={columns} />
                    </>
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
  );
};

export default OwnerListPage;
