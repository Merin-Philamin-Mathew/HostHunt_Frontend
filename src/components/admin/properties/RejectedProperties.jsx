import React, { useState } from 'react';
import Pagination from '../../utils/pagination/Pagination';
import { Table } from '../../utils/tables/Table';
import { FiInfo, FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router';

const RejectedProperties = ({ data }) => {
const navigate = useNavigate()
  const columns = [
    { key: 'property_name', label: 'Property Name' },
    { key: 'property_type', label: 'Type' },
    { key: 'host', label: 'Host' },
    { key: 'city', label: 'City' },
    {
      key: 'action',
      label: 'Action',
      render: (row) => (
        <div className="flex items-center space-x-2">
          <button className="text-blue-300"
          onClick={() => navigate(`/admin/in-review/property-details/${row.id}`)}
          >  
          View
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Table data={data} columns={columns} />
      
    </>
  );
};

export default RejectedProperties;
