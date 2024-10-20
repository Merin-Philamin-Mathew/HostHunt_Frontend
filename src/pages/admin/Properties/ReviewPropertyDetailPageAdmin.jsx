import React, { useEffect, useState } from 'react'
import { FaChevronDown } from "react-icons/fa";
import { Navigate, replace, useNavigate, useParams } from 'react-router';
import { adminApproveOrRejectProperties, adminGetPropertiesBasicDetailsService } from '../../../redux/admin/adminService';
import Button from '../../../components/utils/Button';
import { toast } from 'react-toastify';



const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`rounded-lg shadow-md ${className}`}
    {...props}
  />
))
Card.displayName = "Card"

const Tabs = ({ children }) => (
  <div className="w-full">{children}</div>
)

const TabsList = ({ children }) => (
  <div className="flex mb-1">{children}</div>
)

const TabsTrigger = ({ children, isActive, onClick }) => (
  <button 
    className={`px-4  py-2 ${isActive ? 'bg-slate-700 text-white' : 'bg-slate-500 text-slate-100'} rounded-t-lg transition-colors hover:bg-slate-700`}
    onClick={onClick}
  >
    {children}
  </button>
)

const TabsContent = ({ children }) => (
  <div className="bg-slate-700 p-4 rounded-b-lg">{children}</div>
)

export default function ReviewPropertyDetailPageAdmin() {

  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('documents')
  const { property_id } = useParams();
  const [propertyData, setPropertyData] = useState(null);


  const adminAction = async (property_id,status)=>{
    try{
      await adminApproveOrRejectProperties(property_id, status)
      toast.success(`Property ${status} successfully`)
      navigate('/admin/properties',{replace:true})
    }
    catch(e){
      console.error(e);
      toast.error('An error occurred while updating the property status');
    }
  }

  useEffect(() => {
    if (property_id) {
      adminGetPropertiesBasicDetailsService(property_id)
        .then((response) => {
          setPropertyData(response.data);
          console.log('ppp fetching property details:', response);
        })
        .catch((error) => {
          console.error('Error fetching property details:', error);
        });
    }
  }, [property_id]);

  console.log(propertyData, "Property Details");
  
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      <Card className="bg-slate-800 text-white overflow-hidden">
        <div className="p-6 flex flex-col md:flex-row">
          <div className="flex-1 pr-4">
            <h2 className="text-3xl font-bold mb-4">{propertyData?.property_name}</h2>
            <div className="space-y-2">
              <p><strong>Property type:</strong> {propertyData?.property_type}</p>
              <p><strong>Property Owner:</strong> {propertyData?.host}</p>
              <p><strong>City:</strong> {propertyData?.city}</p>
              <p><strong>No. of beds:</strong> {propertyData?.no_of_beds}</p>
              <p><strong>Address:</strong> {propertyData?.address}</p>
              <p><strong>Total Bedrooms:</strong> {propertyData?.total_bed_rooms}</p>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-end justify-between mt-4 md:mt-0">
          <img 
            src={propertyData?.thumbnail_image_url || "/placeholder.svg?height=200&width=300"} 
            alt={propertyData?.property_name || "Property Thumbnail"} 
            className="w-full max-w-sm rounded-lg mb-4 object-cover" 
          />

            <div className="space-x-2 flex">
            
            <Button
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md font-semibold text-sm transition-colors"
              title={'APPROVED'}
              onClick={()=>adminAction(propertyData?.id,'verified')}
            />
            {(propertyData?.status == "in_review")? 
            <Button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-semibold text-sm transition-colors"
              title={'REJECT'}
              onClick={() => adminAction(propertyData?.id,'rejected')}
            />
            :
            <Button
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md font-semibold text-sm transition-colors"
              title={'IN_REVIEW'}
              onClick={() => adminAction(propertyData?.id,'in_review')}
            />
            }
           
            </div>
          </div>
        </div>
      </Card>

      <Tabs>
        <TabsList>
          <TabsTrigger 
            isActive={activeTab === 'documents'} 
            onClick={() => setActiveTab('documents')}
          >
            Property Documents
          </TabsTrigger>
          {/* <TabsTrigger 
            isActive={activeTab === 'policies'} 
            onClick={() => setActiveTab('policies')}
          >
            Policies and Services
          </TabsTrigger>
          <TabsTrigger 
            isActive={activeTab === 'amenities'} 
            onClick={() => setActiveTab('amenities')}
          >
            Property Amenities
          </TabsTrigger> */}
        </TabsList>
        <TabsContent>
          {activeTab === 'documents' && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {propertyData?.documents?.map((document, index) => (
            <div key={index} className="relative group">
              <img 
                src={document.doc_url || "/placeholder.svg?height=150&width=150"} 
                alt={`Document ${index + 1}`} 
                className="w-full h-48 object-cover rounded-lg transition-opacity group-hover:opacity-75" 
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                  View
                </Button>
              </div>
            </div>
          ))}

            </div>
          )}
          {activeTab === 'policies' && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Policies and Services</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p><strong>Check-in Time:</strong> 2:00 PM</p>
                  <p><strong>Check-out Time:</strong> 11:00 AM</p>
                  <p><strong>Pets:</strong> Not Allowed</p>
                  <p><strong>Smoking:</strong> Designated Areas Only</p>
                </div>
                <div>
                  <p><strong>Cancellation:</strong> Free up to 24 hours before check-in</p>
                  <p><strong>Payment:</strong> Credit Card, Cash</p>
                  <p><strong>Age Restriction:</strong> 18+</p>
                  <p><strong>Languages Spoken:</strong> English, Hindi</p>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'amenities' && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Property Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <FaChevronDown className="text-green-500" />
                  <span>Free Wi-Fi</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaChevronDown className="text-green-500" />
                  <span>24/7 Reception</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaChevronDown className="text-green-500" />
                  <span>Locker Storage</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaChevronDown className="text-green-500" />
                  <span>Common Kitchen</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaChevronDown className="text-green-500" />
                  <span>Laundry Facilities</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaChevronDown className="text-green-500" />
                  <span>Tour Desk</span>
                </div>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}