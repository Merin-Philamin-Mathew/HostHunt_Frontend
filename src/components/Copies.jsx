import React, { useRef, useState } from 'react'
import { MapPin, Search } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router'
import { GoogleMap, useJsApiLoader, StandaloneSearchBox } from '@react-google-maps/api'



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


  return(
    <>

      <div className='flex justify-between '>
  <div className="flex items-center pl-4 text-gray-400">
    <MapPin className="h-5 w-5" />
  </div>
  <input
    type="text"
    placeholder="Where you want to go?"
    onChange={(e) => setSearchTerm(e.target.value)}
    className="flex-1 px-4 py-3 text-gray-800 bg-transparent focus:outline-none"
    />
  <button
    className="m-1 px-3 md:px-8 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
    onClick={handleHomePageSearchButton}
    >
    <span className="hidden xl:inline">Search</span>
    <Search className="xl:hidden h-5 w-5" />
  </button>
</div>
</>
)
}

export default PropertyLocationSearch
