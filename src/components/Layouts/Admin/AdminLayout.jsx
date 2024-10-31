import React, { useState } from 'react';
import { FiHome, FiUsers, FiKey, FiBriefcase, FiMessageSquare, FiCalendar, FiDatabase, } from 'react-icons/fi';
import { TbDatabasePlus } from "react-icons/tb";

import AdminSidebar from '../../admin/partials/AdminSidebar';
import AdminHeader from '../../admin/partials/AdminHeader';

const sidebarItems = [
  { icon: FiHome, text: "Dashboard", key: "dashboard", link:'dashboard' },
  { icon: FiUsers, text: "Users", key: "users", link:'users' },
  { icon: FiKey, text: "Property Owners", key: "propertyOwners", link:'hosts' },
  { icon: FiBriefcase, text: "Properties", key: "properties", link:'properties' },
  { icon: FiMessageSquare, text: "Communication", key: "communication", link:'communication' },
  { icon: FiCalendar, text: "Bookings", key: "bookings", link:'bookings' },
  { icon: TbDatabasePlus, text: "Property Configurations", key: "property_configurations", link:'property_configurations' },
];
const sidebarDict = sidebarItems.reduce((acc, item) => {
  acc[item.key] = item.text;
  return acc;
}, {});

const AdminOutlet = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);


  return (
    <div className="flex bg-slate-800 text-white min-h-screen">
      <AdminSidebar
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        sidebarItems={sidebarItems}
      />
      <div className="flex-1 flex flex-col">
        <AdminHeader toggleSidebar={toggleSidebar} />
        <main className="flex-1  md:p-10  overflow-auto bg-slate-300 text-slate-800">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminOutlet;