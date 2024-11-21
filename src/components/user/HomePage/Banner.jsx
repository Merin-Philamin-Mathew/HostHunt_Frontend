import React from 'react'
import PropetyLocationSearch from './PropetyLocationSearch'

export default function Banner() {

  return (
    <div className="bg-themeColor2 text-white py-12  text-center rounded-3xl shadow-xl shadow-gray-400 relative">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">
        Find Your Perfect Stay!
      </h1>
      <p className="text-lg mb-6 max-w-3xl  mx-auto">
        Start your journey with us—explore the best hostels, PGs, and rentals across Kerala. Sign up now and find your ideal spot today!
      </p>
      <div className='flex justify-center'>
          <div className="flex items-stretch bg-white rounded-lg shadow-lg shadow-gray-400 absolute -bottom-6 w-3/4 md:w-2/3 lg:w-1/2">
            <PropetyLocationSearch/>
          </div>
      </div>
    </div>
  )
}
