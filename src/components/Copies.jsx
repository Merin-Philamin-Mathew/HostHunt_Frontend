import React from 'react';
import { Link } from 'react-router-dom';
import POHeader from './partials/POHeader';

const ListPropertySteps = () => {
  return (
    <>
      <POHeader/>
    <div className="flex flex-col items-center py-8">
      {/* Back Arrow and Title */}
      <div className="flex items-center m-6 w-full max-w-xl px-4">
        <Link to="/host/" className="text-5xl font-medium text-gray-700">
          <span className="inline-block mr-2">&#8592;</span> {/* Left arrow symbol */}
        </Link>
        <h1 className="text-2xl font-semibold">List Your Property</h1>
      </div>

      {/* Steps and Buttons */}
      <div className="w-full max-w-xl px-4">
        {/* Step 1 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">List and verify your property</h2>
          <p className="text-gray-600 mb-4">
            Share your property’s documentation, so we can verify this information.
          </p>
          <button className="bg-themeColor hover:bg-orange-500 text-white font-bold py-2 px-6 rounded-xl">
            Verify Your Property
          </button>
        </div>

        {/* Step 2 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">HostHunt will verify your property details</h2>
          <p className="text-gray-600 mb-4">
            Our team will now verify your documentation. We’ll send you an email within the next 24-72 hrs 
            (during the working week) with details on next steps for listing your property.
          </p>
        </div>

        {/* Step 3 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Onboarding</h2>
          <p className="text-gray-600 mb-4">
            Complete your property details (number and types of rooms, photos, facilities, etc.).
          </p>
          <button className="bg-themeColor hover:bg-orange-500 text-white font-bold py-2 px-6 rounded-xl">
            Complete Listing Process
          </button>
        </div>

        {/* Final Step */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Start welcoming guests</h2>
          <p className="text-gray-600">
            Your property is now live and ready to welcome guests.
          </p>
        </div>
      </div>
    </div>
    
    </>
  );
};

export default ListPropertySteps;
