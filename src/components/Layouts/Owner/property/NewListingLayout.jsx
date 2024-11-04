import React from 'react';
import Sidebar from '../../../utils/Sidebar';
import POFooter from '../../../property_owner/partials/POFooter';
import { FaFile, FaInfo, FaMapMarkerAlt, FaCheckCircle, FaBuilding,FaBed, FaShieldAlt  } from 'react-icons/fa';
import { Outlet } from 'react-router-dom';
import POHeader from '../../../property_owner/partials/POHeader';

function NewListingLayout() {
  const isPropertyDetailsComplete = !!localStorage.getItem('property_details');  // If property details are in local storage
  const propertyDocs = parseInt(localStorage.getItem('property_docs'), 10);  // Convert the stored value to an integer
  const isDocumentsComplete = propertyDocs > 0;  // Check if it's greater than zero
  
  const sidebarItems = [
    { title: 'Property Details', link: '/host/new-listing/property-details', icon: <FaBuilding />, disabled: false  },
    { title: 'Documents', link: '/host/new-listing/documents', icon: <FaFile />,disabledf: !isPropertyDetailsComplete   },
    { title: 'Policies & Services', link: '/host/new-listing/policies&services', icon: <FaShieldAlt />   },
    { title: 'Facilities', link: '/host/new-listing/facilities', icon: <FaBed />  },
    { title: 'Finish', link: '/host/new-listing/finish', icon: <FaCheckCircle />,disabledf: !isDocumentsComplete    }
  ];

  return (
    <div className="relative min-h-screen flex flex-col bg-gray-100">

      <div className="sticky top-0 z-50">
        <POHeader/>
      </div>

      <div className="flex flex-grow py-8 bg-muted_bg">

        <aside className="relative p-6">
          <div className="sticky top-[100px] py-3 px-1 rounded-3xl bg-white shadow-xl">
            <Sidebar items={sidebarItems} />
          </div>
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

export default NewListingLayout;
