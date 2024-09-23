import React from 'react';

const ReviewCard = ({ name, role, review, image }) => {
  return (
    <div className="p-4 border rounded-lg shadow-md text-center">
      <img src={image} alt={name} className="w-20 h-20 rounded-full mx-auto"/>
      <h2 className="mt-2 font-bold">{name}</h2>
      <p className="text-sm text-gray-600">{role}</p>
      <p className="mt-2">{review}</p>
    </div>
  );
}

export default ReviewCard;
