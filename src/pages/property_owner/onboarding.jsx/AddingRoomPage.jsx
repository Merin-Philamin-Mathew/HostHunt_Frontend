import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRoomsByProperty } from '../../../features/Property/PropertyServices';
import RoomActionCard from '../../../components/utils/cards/Rooms/RoomActionCard';
import { useNavigate } from 'react-router';
import RoomDetailsForm from '../../../components/property_owner/onboardinag/AddingRoom/RoomDetailsForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/utils/Tabs/Tabs';
import AddingRoomFaciilities from '../../../components/property_owner/onboardinag/AddingRoom/AddingRoomFaciilities';
import AddingRoomImages from '../../../components/property_owner/onboardinag/AddingRoom/AddingRoomImages';
import { createRooms } from '../../../features/Property/PropertyActions'; // Adjust the import path as needed
import { setAllRoomsByProperty } from '../../../features/Property/PropertySlice';

function AddingRoomPage() {
    // const [rooms, setRooms] = useState([]);
    const property_id = localStorage.getItem('property_id');
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const { RoomDetails, RoomFacilities, RoomImages } = useSelector((state) => state.property);

    const [activeTab, setActiveTab] = useState('roomDetails');
    const tabs = [
        { id: 'roomDetails', label: 'Room Details', component: RoomDetailsForm },
        { id: 'roomFacilities', label: 'Room Facilities', component: AddingRoomFaciilities },
        { id: 'roomImages', label: 'Room Images', component: AddingRoomImages },
    ];
    const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || RoomDetailsForm;

    const enableSubmit = RoomDetails && RoomFacilities.length > 0 && RoomImages.length > 0;
    const allRooms = useSelector((state) => state.property.allRoomByProperty);
    

    useEffect(() => {
        if (property_id) {
            getAllRoomsByProperty(property_id)
                .then(response => {
                    // setRooms(response.data);
                    dispatch(setAllRoomsByProperty(response.data))
                    console.log('Rooms:', response.data);
                })
                .catch(error => {
                    console.error('Error fetching rooms:', error);
                });
        }
    }, [property_id]);

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
                {allRooms?.map((room, index) => (
                    <div key={index} className="p-2">
                        <RoomActionCard {...room} />
                    </div>
                ))}
            </div>
            <div className="rounded-md px-3">
                <Tabs className="h-full mb-10">
                    <TabsList className="flex-shrink-0 my-2 md:my-4 bg-gray-400">
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

            <div className="flex justify-center py-4">
                <button
                    type="submit"
                    className={`px-20 py-3 mt-4 font-accent rounded-xl shadow-md text-white ${
                        enableSubmit
                            ? 'bg-themeColor hover:opacity-90'
                            : 'bg-themeColor opacity-60 hover:opacity-40 cursor-not-allowed'
                    }`}
                    onClick={()=>{createRooms(property_id, RoomDetails, RoomFacilities, RoomImages, dispatch)}}
                    disabled={!enableSubmit}
                >
                    Add Room
                </button>
            </div>
        </>
    );
}

export default AddingRoomPage;

