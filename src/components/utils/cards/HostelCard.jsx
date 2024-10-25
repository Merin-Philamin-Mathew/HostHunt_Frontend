import React from 'react'
import { MapPin, Ban, Edit2, Home, Bed, CheckCircle, XCircle, AlertCircle, Building, BookCheck, LoaderCircle } from 'lucide-react'
import { useNavigate } from 'react-router'
import { getAllDocumentsofProperty } from '../../../features/Property/PropertyServices'


const StatusBadge = ({ status }) => {
  const statusConfig = {
    in_progress: { features: 'border border-yellow-600 text-yellow-600 bg-gray-50', icon: LoaderCircle},
    in_review: { features: 'border border-blue-600 text-blue-600', icon: AlertCircle },
    verified: { features: 'border border-green-600 text-green-600', icon: CheckCircle },
    rejected: { features: 'border border-red-600 text-[#d34040]', icon: XCircle },
    published: { features: 'border border-teal-600 bg-teal-600 text-white-800', icon: BookCheck},
  }

  const { features, icon: Icon } = statusConfig[status] || statusConfig.in_progress

  return (
    <div className={`flex items-center ${features} text-white px-2 py-1 rounded-full text-xs font-semibold`}>
      <Icon className="w-3 h-3 mr-1" />
      {status.replace('_', ' ')}
    </div>
  )
}

const HostelCard = ({ property }) => {
  const navigate = useNavigate()


  const handleOpenListingSummary = async () => {
    localStorage.setItem('property_id',property.id)
    const status = property.status
    localStorage.setItem('property_status',status)
    if (status==='in_progress' ){
      localStorage.setItem('property_details',JSON.stringify(property))
      try{
        const response = await getAllDocumentsofProperty(property.id)
        localStorage.setItem('property_docs',JSON.stringify(response.data.property_docs))
        localStorage.setItem('documents',JSON.stringify(response.data.documents))
      }
      catch(e){
        console.error(e.response.data.message||'An error occurred while fetching documents')
        localStorage.setItem('property_docs',0)
        navigate('/host/new-listing')
      }
    }
    if (status==='verified'){
      localStorage.setItem('property_type',JSON.stringify(property.property_type))
    }
    navigate('/host/new-listing')
    
  }

  return (
    <div className="bg-white hover:cursor-pointer shadow-lg rounded-lg overflow-hidden  my-4 transition-all hover:shadow-xl"
          onClick={()=>handleOpenListingSummary()}
    >
      <div className="relative">
        <img 
          className="w-full h-48 object-cover" 
          src={property.thumbnail_image_url} 
          alt={property.property_name} 
        />
        <div className="absolute top-0 right-0 bg-zinc-50 bg-opacity-90 shadow-xl  m-1 rounded-full text-xs font-semibold">
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