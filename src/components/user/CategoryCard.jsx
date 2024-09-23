import React from 'react';

const CategoryCard = ({ title, description, image }) => {
  return (
    <div className="flex flex-col items-center   relative rounded-lg shadow-md">
      <img src={image} alt={title} className="w-full h-72 object-cover rounded-lg"/>
      <div class="absolute inset-0 bg-gray-700 opacity-40 rounded-md"></div>
    <div class="absolute inset-0 flex-row items-start p-6" >
        <h2 class="text-white text-xl font-bold">{title}</h2>
      <p className="mt-2 text-gray-300">{description}</p>
    </div>
    </div>
  );
}

export default CategoryCard;
