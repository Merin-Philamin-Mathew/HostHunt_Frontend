import React, { useState } from 'react';
import { FiHome, FiUsers, FiKey, FiBriefcase, FiMessageSquare, FiCalendar} from 'react-icons/fi';
import AdminSidebar from '../admin/partials/AdminSidebar';
import AdminHeader from '../admin/partials/AdminHeader';

const sidebarItems = [
  { icon: FiHome, text: "Dashboard", key: "dashboard", link:'dashboard' },
  { icon: FiUsers, text: "Users", key: "users", link:'users' },
  { icon: FiKey, text: "Property Owners", key: "propertyOwners", link:'hosts' },
  { icon: FiBriefcase, text: "Properties", key: "properties", link:'properties' },
  { icon: FiMessageSquare, text: "Communication", key: "communication", link:'communication' },
  { icon: FiCalendar, text: "Bookings", key: "bookings", link:'bookings' },
];


const AdminOutlet = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const getTitle = () => {
    const item = sidebarItems.find(item => item.key === activeItem);
    return item ? item.text : 'Dashboard';
  };

  return (
    <div className="flex bg-slate-800 text-white min-h-screen">
      <AdminSidebar
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        sidebarItems={sidebarItems}
      />
      <div className="flex-1 flex flex-col">
        <AdminHeader toggleSidebar={toggleSidebar} title={getTitle()} />
        <main className="flex-1 p-6 md:p-10 overflow-auto bg-slate-600 text-slate-800">
            {/* <div className='flex-1 overflow-auto p-9 bg-slate-800 rounded-lg h-full'> */}
          {children}
            {/* </div> */}
        </main>
      </div>
    </div>
  );
};

export default AdminOutlet;