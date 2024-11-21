import React, { useEffect, useState } from 'react';
import RoomDetailsForm from '../../../components/property_owner/onboardinag/AddingRoom/RoomDetailsForm';
import { getAllRoomsByProperty, reviewAndSubmitSteps_ChangeStatus } from '../../../features/Property/PropertyServices';
import RoomActionCard from '../../../components/utils/cards/Rooms/RoomActionCard';
import { useNavigate } from 'react-router';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/utils/Tabs/Tabs';
import AddingRoomFaciilities from '../../../components/property_owner/onboardinag/AddingRoom/AddingRoomFaciilities';
import AddingRoomImages from '../../../components/property_owner/onboardinag/AddingRoom/AddingRoomImages';

function AddingRoomPage() {
    const [rooms, setRooms] = useState([]);
    const property_id = localStorage.getItem('property_id'); // Assuming property_id is stored in local storage
    const navigate = useNavigate()
    const handleSubmitAndPublish = async ()=> {
        try {
            const response = await reviewAndSubmitSteps_ChangeStatus(property_id,'published')
            localStorage.setItem('property_status','published');
            navigate('/host/new-listing/',{replace:true});
        }catch(error){
            console.error(error);  
        }
       
    }
    useEffect(() => {
        if (property_id) {
            getAllRoomsByProperty(property_id)
                .then(response => {
                    setRooms(response.data); // Assuming the API returns the room data in `response.data`
                    console.log('lll',response.data)
                })
                .catch(error => {
                    console.error('Error fetching rooms:', error);
                });
        }
    }, [property_id]);

    const [activeTab, setActiveTab] = useState('roomDetails')

    const tabs = [
      { id: 'roomDetails', label: 'Room Details', component: RoomDetailsForm },
      { id: 'roomFacilities', label: 'Room Facilities', component: AddingRoomFaciilities },
      { id: 'roomImages', label: 'Room Images', component: AddingRoomImages },
    ]
  
    const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || RoomDetailsForm
  

    return (
        <>
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
            {/* <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4"> */}
                {rooms.map((room, index) => (

                    <div  className="p-4 ">
                        <RoomActionCard {...room}/>
                    </div>
                ))}
            </div>

            
            <div className="mx-auto h-full flex flex-col">
    <Tabs className="h-full mb-10">
      <TabsList className="flex-shrink-0">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              isActive={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              variant="link"
            >
              {tab.label}
            </TabsTrigger>
            
          ))}
        </TabsList>
        
    
        <TabsContent className="flex-grow h-full min-h-0flex flex-col">
          <ActiveComponent />
        </TabsContent>
         </Tabs>
    </div>
        
        <div className='flex justify-center py-4'>
            <button
            type="submit"
            className="px-20 py-3 mt-4 bg-themeColor text-white  font-accent rounded-xl shadow-md hover:opacity-90"
                onClick={()=>{handleSubmitAndPublish()}}
         >
            Submit And Publish Your Property
          </button>
        </div>
        </>
    );
}

export default AddingRoomPage;
