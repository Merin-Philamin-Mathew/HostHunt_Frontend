import React from 'react';

const Banner = () => {
  return (
    <div className="bg-themeColor2 text-white py-12 text-center rounded-3xl">
      <h1 className="text-3xl font-bold mb-4">Find Your Perfect Stay!</h1>
      <p className="text-lg mb-6">Start your journey with us—explore the best hostels, PGs, and rentals across Kerala.</p>
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Enter accommodation type or location"
          className="px-4 py-2 rounded-l-md text-gray-700 "
        />
        <button className="px-4 py-2 bg-orange-500 text-white rounded-r-md">Search</button>
      </div>
    </div>
  );
};

export default Banner;
