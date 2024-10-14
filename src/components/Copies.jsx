import React, { useState } from 'react';
import { FiHome, FiUsers, FiKey, FiBriefcase, FiMessageSquare, FiCalendar, FiLogOut, FiBell, FiSettings, FiSearch, FiChevronLeft, FiChevronRight, FiMenu, FiX } from 'react-icons/fi';

const Sidebar = ({ isOpen, toggleSidebar }) => (
  <div className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} transform transition-transform duration-300 ease-in-out fixed inset-y-0 left-0 z-30 w-64 bg-gray-900 text-white overflow-y-auto lg:translate-x-0 lg:static lg:inset-0`}>
    <div className="p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">HostHunt</h1>
      <button className="lg:hidden text-white" onClick={toggleSidebar}>
        <FiX className="h-6 w-6" />
      </button>
    </div>
    <nav className="mt-8">
      <SidebarItem icon={<FiHome />} text="Dashboard" />
      <SidebarItem icon={<FiUsers />} text="Users" />
      <SidebarItem icon={<FiKey />} text="Property Owners" />
      <SidebarItem icon={<FiBriefcase />} text="Properties" active />
      <SidebarItem icon={<FiMessageSquare />} text="Communication" />
      <SidebarItem icon={<FiCalendar />} text="Bookings" />
    </nav>
    <div className="absolute bottom-0 p-4">
      <SidebarItem icon={<FiLogOut />} text="Logout" />
    </div>
  </div>
);

const SidebarItem = ({ icon, text, active }) => (
  <div className={`flex items-center p-4 ${active ? 'bg-gray-800' : 'hover:bg-gray-800'}`}>
    {icon}
    <span className="ml-4">{text}</span>
  </div>
);

const Header = ({ toggleSidebar }) => (
  <div className="flex justify-between items-center p-4 bg-gray-800">
    <div className="flex items-center">
      <button className="mr-2 lg:hidden text-white" onClick={toggleSidebar}>
        <FiMenu className="h-6 w-6" />
      </button>
      <h2 className="text-xl font-semibold text-white">Properties</h2>
    </div>
    <div className="flex items-center space-x-4">
      <button className="text-white">
        <FiBell className="h-5 w-5" />
      </button>
      <button className="text-white">
        <FiSettings className="h-5 w-5" />
      </button>
      <div className="bg-yellow-500 rounded-full w-8 h-8 flex items-center justify-center">
        <span className="text-gray-900 font-semibold">A</span>
      </div>
    </div>
  </div>
);

const FilterButtons = () => (
  <div className="flex flex-wrap gap-2 mb-4">
    <button className="bg-blue-500 text-white px-4 py-2 rounded">Verified</button>
    <button className="bg-gray-700 text-white px-4 py-2 rounded">In review</button>
    <button className="bg-gray-700 text-white px-4 py-2 rounded">Rejected</button>
  </div>
);

const SearchBar = () => (
  <div className="relative mb-4">
    <FiSearch className="absolute left-3 top-3 text-gray-400" />
    <input
      type="text"
      placeholder="Search by ID, product, or others..."
      className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

const PropertyTable = ({ properties }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full bg-gray-800 text-white">
      <thead>
        <tr className="border-b border-gray-700">
          <th className="py-3 px-4 text-left">Name</th>
          <th className="py-3 px-4 text-left">Property type</th>
          <th className="py-3 px-4 text-left">E-mail</th>
          <th className="py-3 px-4 text-left">Phone</th>
          <th className="py-3 px-4 text-left">Action</th>
        </tr>
      </thead>
      <tbody>
        {properties.map((property, index) => (
          <tr key={index} className="border-b border-gray-700">
            <td className="py-3 px-4">{property.name}</td>
            <td className="py-3 px-4">{property.type}</td>
            <td className="py-3 px-4">{property.email}</td>
            <td className="py-3 px-4">{property.phone}</td>
            <td className="py-3 px-4">
              <div className="flex items-center space-x-2">
                <button className="text-red-500">
                  <FiSearch className="h-4 w-4" />
                </button>
                <button className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                  1
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Pagination = () => (
  <div className="flex justify-center items-center space-x-2 mt-4">
    <button className="text-gray-400">
      <FiChevronLeft className="h-4 w-4" />
    </button>
    <button className="px-3 py-1 rounded bg-gray-700 text-white">1</button>
    <button className="px-3 py-1 rounded bg-blue-500 text-white">2</button>
    <button className="px-3 py-1 rounded bg-gray-700 text-white">3</button>
    <button className="px-3 py-1 rounded bg-gray-700 text-white">4</button>
    <span className="text-gray-400">...</span>
    <button className="px-3 py-1 rounded bg-gray-700 text-white">20</button>
    <button className="text-gray-400">
      <FiChevronRight className="h-4 w-4" />
    </button>
  </div>
);

export default function PropertyList() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const properties = [
    { name: 'La Mer Inn', type: 'Street 1 New Delhi', email: 'ajith@gmail.com', phone: '1234567890' },
    { name: 'Kochin inn', type: 'Kochi', email: 'SS@gmail.com', phone: '9876543234' },
    { name: 'New Enclave', type: 'BB street Bangalore', email: 'ayesh@gmail.com', phone: '6545678900' },
    { name: 'ABC inn', type: 'Allappey', email: 'asds@gmail.com', phone: '9876787657' },
    { name: 'New Castle', type: 'Alwaye', email: 'vinayak@gmail.com', phone: '9857689755' },
    { name: 'Apples Inn', type: 'Kolkata', email: 'clint@gmail.com', phone: '9245778886' },
  ];

  return (
    <div className="flex bg-gray-900 text-white min-h-screen">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col">
        <Header toggleSidebar={toggleSidebar} />
        <div className="p-4 md:p-8 overflow-auto">
          <FilterButtons />
          <SearchBar />
          <PropertyTable properties={properties} />
          <Pagination />
        </div>
      </div>
    </div>
  );
}