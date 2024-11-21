import React, { useEffect, useState } from 'react';
import { getAllRoomsByProperty, reviewAndSubmitSteps_ChangeStatus } from '../../../features/Property/PropertyServices';
import RoomActionCard from '../../../components/utils/cards/Rooms/RoomActionCard';
import { useNavigate } from 'react-router';
import RoomDetailsForm from '../../../components/property_owner/onboardinag/AddingRoom/RoomDetailsForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/utils/Tabs/Tabs';
import AddingRoomFaciilities from '../../../components/property_owner/onboardinag/AddingRoom/AddingRoomFaciilities';
import AddingRoomImages from '../../../components/property_owner/onboardinag/AddingRoom/AddingRoomImages';

function AddingRoomPage() {
    const [rooms, setRooms] = useState([]);
    const property_id = localStorage.getItem('property_id'); // Assuming property_id is stored in local storage
    const navigate = useNavigate()

    const [activeTab, setActiveTab] = useState('roomDetails')
    const tabs = [
        { id: 'roomDetails', label: 'Room Details', component: RoomDetailsForm },
        { id: 'roomFacilities', label: 'Room Facilities', component: AddingRoomFaciilities },
        { id: 'roomImages', label: 'Room Images', component: AddingRoomImages },
      ]
    const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || RoomDetailsForm
  

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



    return (
        <>
            <div className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-4">
                {rooms.map((room, index) => (
                    <div  className="p-4 ">
                        <RoomActionCard {...room}/>
                        </div>
                ))}
            </div>
            <div className='rounded-md   px-3'>
            <Tabs className="h-full mb-10">
                <TabsList className="flex-shrink-0  my-2 md:my-4 bg-gray-400">
                    {tabs.map((tab) => (
                        <TabsTrigger
                        key={tab.id}
                        isActive={activeTab === tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        variant="owner_form"
                    
                        >
                        {tab.label}
                        </TabsTrigger>
                    ))}
                    </TabsList>
                <TabsContent className="flex-grow h-full min-h-0 flex flex-col">
                <ActiveComponent />
                </TabsContent>
            </Tabs>
            </div>
           
            {/* <RoomDetailsForm setRooms={setRooms}/> */}
        
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
