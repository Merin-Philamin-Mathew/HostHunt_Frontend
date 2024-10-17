import { useEffect } from 'react';
import { Table } from '../../utils/tables/Table';

const VerifiedProperties = ({ data }) => {

  useEffect(() => {
    console.log('useEffect_verified property', data);
  }, [data]);

  const columns = [
    { key: 'property_name', label: 'Property Name' },
    { key: 'property_type', label: 'Type' },
    { key: 'host', label: 'Host' },
    { key: 'city', label: 'City' },
    {
      key: 'is_listed',
      label: 'Active',
      render: (row) => (
        <div>
          <button className={row.is_listed ? "text-green-500" : "text-red-500"}>
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
          <button className={row.is_listed ? "text-red-500" : "text-green-500"}>
            {row.is_listed ? "Block" : "Unblock"}
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

export default VerifiedProperties;