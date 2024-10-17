import React from 'react';
import { Table } from '../../utils/tables/Table';
import { FiSearch } from 'react-icons/fi';

const InReviewProperties = ({ data }) => {


  const columns = [
    { key: 'property_name', label: 'Property Name' },
    { key: 'property_type', label: 'Type' },
    { key: 'host', label: 'Host' },
    { key: 'city', label: 'City' },
    // { key: 'postcode', label: 'Postcode' },
    // { key: 'address', label: 'Address' },
    // { key: 'total_bed_rooms', label: 'Total Bed Rooms' },
    // { key: 'no_of_beds', label: 'No of Beds' }, 
    {
      key: 'action',
      label: 'Action',
      render: (row) => (
        <div className="flex items-center space-x-2">
          <button className="text-red-500">
            <FiSearch className="h-4 w-4" />
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

export default InReviewProperties;
