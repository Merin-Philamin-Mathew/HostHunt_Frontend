// AdminHeader.js
import React from 'react';
import { FiBell, FiSettings, FiMenu,  } from 'react-icons/fi';


const AdminHeader = ({ toggleSidebar, title }) => (
    <div className="flex justify-between items-center p-4 bg-slate-800">
      <div className="flex items-center">
        <button className="mr-2 lg:hidden text-white" onClick={toggleSidebar} aria-label="Open sidebar">
          <FiMenu className="h-6 w-6" />
        </button>
        <h2 className="text-xl font-semibold text-white">{title}</h2>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-white" aria-label="Notifications">
          <FiBell className="h-5 w-5" />
        </button>
        <button className="text-white" aria-label="Settings">
          <FiSettings className="h-5 w-5" />
        </button>
        <div className="bg-yellow-500 rounded-full w-8 h-8 flex items-center justify-center">
          <span className="text-slate-900 font-semibold">A</span>
        </div>
      </div>
    </div>
  );
export default AdminHeader;
