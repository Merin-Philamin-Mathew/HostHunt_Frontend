import React, { useState } from 'react';
import { FiSearch, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

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

const SearchBar = ({ onSearch }) => (
  <div className="relative">
    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    <input
      type="text"
      placeholder="Search by ID, product, or others..."
      className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      onChange={(e) => onSearch(e.target.value)}
    />
  </div>
);

const Table = ({ data, columns }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full  text-white">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key} className="py-3 px-4 text-left">{column.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index} className="border-t border-gray-700">
            {columns.map((column) => (
              <td key={column.key} className="py-3 px-4">
                {column.render ? column.render(row) : row[column.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div className="flex justify-center items-center space-x-2 mt-4">
    <button
      className="text-gray-400 disabled:opacity-50"
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
    >
      <FiChevronLeft className="h-5 w-5" />
    </button>
    {[...Array(totalPages)].map((_, i) => (
      <button
        key={i}
        className={`px-3 py-1 rounded ${
          currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
        }`}
        onClick={() => onPageChange(i + 1)}
      >
        {i + 1}
      </button>
    ))}
    <button
      className="text-gray-400 disabled:opacity-50"
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
    >
      <FiChevronRight className="h-5 w-5" />
    </button>
  </div>
);

const PropertyList = () => {
  const [filter, setFilter] = useState('verified');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const allProperties = [
    { id: 1, name: 'La Mer Inn', type: 'Street 1 New Delhi', email: 'ajith@gmail.com', phone: '1234567890', status: 'verified' },
    { id: 2, name: 'Kochin inn', type: 'Kochi', email: 'SS@gmail.com', phone: '9876543234', status: 'in_review' },
    { id: 3, name: 'New Enclave', type: 'BB street Bangalore', email: 'ayesh@gmail.com', phone: '6545678900', status: 'rejected' },
    { id: 4, name: 'ABC inn', type: 'Allappey', email: 'asds@gmail.com', phone: '9876787657', status: 'verified' },
    { id: 5, name: 'New Castle', type: 'Alwaye', email: 'vinayak@gmail.com', phone: '9857689755', status: 'in_review' },
    { id: 6, name: 'Apples Inn', type: 'Kolkata', email: 'clint@gmail.com', phone: '9245778886', status: 'verified' },
    // Add more properties as needed
  ];

  const filteredProperties = allProperties
    .filter(property => property.status === filter)
    .filter(property => 
      Object.values(property).some(value => 
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'type', label: 'Property type' },
    { key: 'email', label: 'E-mail' },
    { key: 'phone', label: 'Phone' },
    { 
      key: 'action', 
      label: 'Action',
      render: (row) => (
        <div className="flex items-center space-x-2">
          <button className="text-red-500">
            <FiSearch className="h-4 w-4" />
          </button>
          <button className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
            1
          </button>
        </div>
      )
    },
  ];

  return (
    <>
      <div className="mb-6 flex flex-wrap gap-4">
        <FilterButton label="Verified" isActive={filter === 'verified'} onClick={() => setFilter('verified')} />
        <FilterButton label="In review" isActive={filter === 'in_review'} onClick={() => setFilter('in_review')} />
        <FilterButton label="Rejected" isActive={filter === 'rejected'} onClick={() => setFilter('rejected')} />
      </div>
      <div className="mb-6">
        <SearchBar onSearch={setSearchTerm} />
      </div>
      <Table data={paginatedProperties} columns={columns} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

export default PropertyList;