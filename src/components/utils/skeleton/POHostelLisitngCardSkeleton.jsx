import React from 'react';

const POHostelListingCardSkeleton = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden my-4 animate-pulse">
      {/* Image Skeleton */}
      <div className="w-full h-48 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-skeleton"></div>

      {/* Status Badge Skeleton */}
      <div className="absolute top-0 right-0 m-1">
        <div className="h-6 w-20 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded-full animate-skeleton"></div>
      </div>

      {/* Content Skeleton */}
      <div className="p-4">
        {/* Property Name */}
        <div className="h-6 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded w-3/4 mb-2 animate-skeleton"></div>

        {/* Location */}
        <div className="h-4 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded w-full mb-2 animate-skeleton"></div>

        {/* Rooms and Beds */}
        <div className="flex space-x-2 mb-2">
          <div className="h-4 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded w-1/3 animate-skeleton"></div>
          <div className="h-4 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded w-1/3 animate-skeleton"></div>
        </div>

        {/* Optional Action Buttons */}
        <div className="flex justify-between mt-4">
          <div className="h-8 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded w-1/3 animate-skeleton"></div>
          <div className="h-8 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded w-1/3 animate-skeleton"></div>
        </div>
      </div>
    </div>
  );
};

export default POHostelListingCardSkeleton;
