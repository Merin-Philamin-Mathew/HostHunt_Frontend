// import React, { useEffect, useState } from 'react';
// import Pagination from '../../utils/pagination/Pagination';
// import { Table } from '../../utils/tables/Table';
// import { FiSearch } from 'react-icons/fi';
// import { adminGetPropertiesService } from '../../../redux/admin/adminService';

// const PropertiesView = ({properties}) => {


//   const columns = [
//     { key: 'name', label: 'Name' },
//     { key: 'type', label: 'Property Type' },
//     { key: 'host', label: 'Property Owner' },
//     { key: 'location', label: 'Location' },
//     {
//       key: 'action',
//       label: 'Action',
//       render: (row) => (
//         <div className="flex items-center space-x-2">
//           <button className="text-red-500">
//             <FiSearch className="h-4 w-4" />
//           </button>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <>
//       <Table data={paginatedProperties} columns={columns} />
//       <Pagination
//         currentPage={currentPage}
//         totalPages={totalPages}
//         onPageChange={setCurrentPage}
//       />
//     </>
//   );
// };

// export default PropertiesView;
