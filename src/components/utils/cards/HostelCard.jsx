import React from 'react';

const HostelCard = ({ imageUrl, name, location, listingDate }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-72 my-4">
      <img className="w-full h-48 object-cover" src={imageUrl} alt={name} />
      <div className="p-4">
        <h2 className="font-bold text-lg">{name}</h2>
        <p className="text-gray-500">{location}</p>
        <p className="text-gray-400 text-sm">Listing added on {listingDate}</p>
        <div className="flex justify-between mt-4">
          <button className="bg-block text-white px-8 py-2 rounded-lg">Block</button>
          <button className="bg-yellow-500 text-white px-10 py-2 rounded-lg">Edit</button>
        </div>
      </div>
    </div>
  );
};

export default HostelCard;
