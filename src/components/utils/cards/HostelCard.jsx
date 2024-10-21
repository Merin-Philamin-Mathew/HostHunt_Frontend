import React from 'react'
import { MapPin, Ban, Edit2, Home, Bed, User, CheckCircle, XCircle, AlertCircle, Building } from 'lucide-react'
import { useNavigate } from 'react-router'
import { getAllDocumentsofProperty } from '../../../features/Property/PropertyServices'

const Button = ({ children, variant, onClick }) => (
  <button
    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
      variant === 'block'
        ? 'bg-red-500 text-white hover:bg-red-600'
        : 'bg-yellow-500 text-white hover:bg-yellow-600'
    }`}
    onClick={onClick}
  >
    {children}
  </button>
)

const StatusBadge = ({ status }) => {
  const statusConfig = {
    in_progress: { color: 'border border-yellow-600 text-yellow-600', icon: AlertCircle },
    in_review: { color: 'border border-blue-600 text-blue-600', icon: AlertCircle },
    verified: { color: 'border border-green-600 text-green-600', icon: CheckCircle },
    rejected: { color: 'border border-red-700 text-red-700', icon: XCircle },
  }

  const { color, icon: Icon } = statusConfig[status] || statusConfig.in_progress

  return (
    <div className={`flex items-center ${color} text-white px-2 py-1 rounded-full text-xs font-semibold`}>
      <Icon className="w-3 h-3 mr-1" />
      {status.replace('_', ' ')}
    </div>
  )
}

const HostelCard = ({ property }) => {
  const navigate = useNavigate()

 

  const handleOpenListingSummary = async () => {
    localStorage.setItem('property_id',property.id)
    localStorage.setItem('property_status',property.status)
    localStorage.setItem('property_details',JSON.stringify(property))
    try{
      const response = await getAllDocumentsofProperty(property.id)
      localStorage.setItem('property_docs',JSON.stringify(response.data.property_docs))
      localStorage.setItem('documents',JSON.stringify(response.data.documents))
      console.log(response.data.proper,'--------------');
      navigate('/host/new-listing')
      return
    }
    catch(e){
      console.error(e.response.data.message)
      localStorage.setItem('property_docs',0)
      navigate('/host/new-listing')
    }
    
  }

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-64 my-4 transition-all hover:shadow-xl"
          onClick={()=>handleOpenListingSummary()}
    >
      <div className="relative">
        <img 
          className="w-full h-48 object-cover" 
          src={property.thumbnail_image_url} 
          alt={property.property_name} 
        />
        <div className="absolute top-0 right-0 bg-white bg-opacity-90 shadow-xl  m-1 rounded-full text-xs font-semibold">
          <StatusBadge status={property.status} />
          
        </div>
        <div className="absolute top-8 right-0 shadow-xl  px-2 bg-indigo-500 m-1 text-xs rounded-e-lg font-semibold">
        <div className="flex items-center text-gray-200 ">
          <Building className="w-3 h-3  mr-1" />
          <p className="text-xs truncate">{property.property_type}</p>
        </div> 
          
        </div>
      </div>
      <div className="p-4">
        <h2 className="font-bold text-lg mb-2 truncate">{property.property_name}</h2>
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          <p className="text-sm truncate">{property.address}, {property.city}</p>
        </div>
        <div className="flex items-center text-gray-600 mb-2">
          <Home className="w-4 h-4 mr-1" />
          <p className="text-sm">{property.total_bed_rooms} rooms</p>
          <Bed className="w-4 h-4 ml-2 mr-1" />
          <p className="text-sm">{property.no_of_beds} beds</p>
        </div>
        {/* <div className="flex items-center text-gray-600 mb-2">
          <Building className="w-4 h-4 mr-1" />
          <p className="text-sm truncate">{property.property_type}</p>
        </div> */}
      
        {property.is_listed?(
          <div className="flex justify-between items-center mt-4">
          <Button variant="block" onClick={handleBlock}>
            <Ban className="w-4 h-4 mr-1 inline" />
            Block
          </Button>
          <Button variant="edit" onClick={handleEdit}>
            <Edit2 className="w-4 h-4 mr-1 inline" />
            Edit
          </Button>
        </div>
        ):(<></>)}
        
      </div>
    </div>
  )
}

export default HostelCard