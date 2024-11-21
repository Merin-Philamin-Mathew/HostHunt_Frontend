import React, { useState } from 'react'
import { MapPin, Search } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router'

function PropertyLocationSearch() {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const Term = queryParams.get('query')
    
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState(Term)


  const handleHomePageSearchButton = () => {
    if (searchTerm.trim()) {
      navigate(`/property-results?query=${encodeURIComponent(searchTerm)}`)
    }
  }

  return (
    <>
     {/* <div className="flex items-stretch bg-white rounded-lg shadow-lg shadow-gray-400 absolute -bottom-6 w-3/4 md:w-2/3 lg:w-1/2"> */}
      <div className="flex items-center pl-4 text-gray-400">
        <MapPin className="h-5 w-5" />
      </div>
      <input
        type="text"
        placeholder="Where you want to go?"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-1 px-4 py-3 text-gray-800 bg-transparent focus:outline-none"
        />
      <button
        className="m-1 px-3 md:px-8 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
        onClick={handleHomePageSearchButton}
        >
         <span className="hidden md:inline">Search</span>
         <Search className="md:hidden h-5 w-5" />
      </button>
          </>
  )
}

export default PropertyLocationSearch
