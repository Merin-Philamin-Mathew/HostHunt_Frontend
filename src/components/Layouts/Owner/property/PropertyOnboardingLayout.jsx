import React from 'react';
// import Sidebar from '../../utils/Sidebar';
import { FaFile, FaInfo, FaMapMarkerAlt, FaCheckCircle, FaBuilding,FaBed, FaShieldAlt  } from 'react-icons/fa';
import { Outlet } from 'react-router-dom';
import POHeader from '../../../property_owner/partials/POHeader';
import POFooter from '../../../property_owner/partials/POFooter';

function PropertyOnboardingLayout() {

  const sidebarItems = [
    { title: 'Property Details', link: '/host/new-listing/property-details', icon: <FaBuilding />  },
    { title: 'Documents', link: '/host/new-listing/documents', icon: <FaFile /> },
  ];

  return (
    <div className="relative min-h-screen flex flex-col bg-gray-100">

      <div className="sticky top-0 z-50">
        <POHeader/>
      </div>

      <div className="flex flex-grow py-8 bg-muted_bg">

        <aside className="relative p-10">
          {/* <div className="sticky top-[100px] py-3 px-1 rounded-3xl bg-white shadow-xl">
            <Sidebar items={sidebarItems} />
          </div> */}
        </aside>


        <main className="flex-grow p-6 overflow-y-auto md:pr-16 lg:pr-24 ">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <POFooter />
    </div>
  );
}

export default PropertyOnboardingLayout;
