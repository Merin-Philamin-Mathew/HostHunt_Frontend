import React from 'react';
import Sidebar from '../utils/Sidebar';
import POFooter from '../property_owner/partials/POFooter';
import { FaFile, FaInfo, FaMapMarkerAlt, FaCheckCircle, FaBuilding,FaBed, FaShieldAlt  } from 'react-icons/fa';
import { MdPolicy } from "react-icons/md";
import { Outlet } from 'react-router-dom';
import POHeader from '../property_owner/partials/POHeader';

function PropertyLayout() {
  const sidebarItems = [
    { title: 'Property Details', link: '/host/new-listing/property-details', icon: <FaBuilding /> },
    { title: 'Documents', link: '/host/new-listing/documents', icon: <FaFile /> },
    // { title: 'Basic Information', link: '/host/new-listing/basic-info', icon: <FaInfo /> },
    { title: 'Policies & Services', link: '/host/new-listing/policies', icon: <FaShieldAlt />   },
    { title: 'Facilities', link: '/host/new-listing/policies', icon: <FaBed />  },
    { title: 'Finish', link: '/host/new-listing/finish', icon: <FaCheckCircle /> }
  ];

  return (
    <div className="relative min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <div className="sticky top-0 z-50">
        <POHeader/>
      </div>

      <div className="flex flex-grow py-8 bg-muted_bg">
        {/* Sidebar */}
        <aside className="relative p-6">
          <div className="sticky top-[100px] py-3 px-1 rounded-3xl bg-white shadow-xl">
            <Sidebar items={sidebarItems} />
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-grow p-6 overflow-y-auto md:pr-16 lg:pr-24 ">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <POFooter />
    </div>
  );
}

export default PropertyLayout;
