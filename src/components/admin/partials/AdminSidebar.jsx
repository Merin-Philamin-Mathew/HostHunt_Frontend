// AdminSidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FiLogOut, FiX } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAdmin, setActiveItem } from '../../../redux/admin/adminSlice';

const AdminSidebar = ({ isOpen, toggleSidebar, sidebarItems }) => {
  const dispatch = useDispatch();
  const activeItem = useSelector((state) => state.admin.activeItem); // Get active item from Redux

  const handleAdminLogout = () => {
    dispatch(logoutAdmin());
  };

  const handleItemClick = (key) => {
    dispatch(setActiveItem(key)); // Update active item in Redux
  };

  return (
    <div className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} min-w-fit transform transition-transform duration-300 ease-in-out fixed inset-y-0 left-0 z-30 w-64 bg-slate-900 text-white overflow-y-auto lg:translate-x-0 lg:static lg:inset-0`}>
      <div className="p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">HostHunt</h1>
        <button className="lg:hidden text-white" onClick={toggleSidebar} aria-label="Close sidebar">
          <FiX className="h-6 w-6" />
        </button>
      </div>
      <nav className="mt-8">
        {sidebarItems.map((item) => (
          <SidebarItem
            link={item.link}
            key={item.key}
            icon={<item.icon />}
            text={item.text}
            active={activeItem === item.key}
            onClick={() => handleItemClick(item.key)}
          />
        ))}
      </nav>
      <div className="absolute bottom-0 p-4">
        <SidebarItem onClick={handleAdminLogout} icon={<FiLogOut />} text="Logout" />
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, text, active, onClick, link }) => (
  <Link to={link}
    className={`flex items-center p-4 cursor-pointer ${
      active ? 'bg-gray-700 text-white' : 'text-slate-300 hover:bg-slate-800'
    }`}
    onClick={onClick}
  >
    {icon}
    <span className="ml-4">{text}</span>
  </Link>
);

export default AdminSidebar;
