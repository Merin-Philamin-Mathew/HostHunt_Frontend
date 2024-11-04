import React, { useEffect, useState } from 'react';
import RoomDetailsForm from '../../../components/property_owner/onboardinag/RoomDetailsForm';
import { getAllRoomsByProperty, reviewAndSubmitSteps_ChangeStatus } from '../../../features/Property/PropertyServices';
import RoomActionCard from '../../../components/utils/cards/Rooms/RoomActionCard';
import { useNavigate } from 'react-router';

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
            console.log('merin',property_id);
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
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
            {/* <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4"> */}
                {rooms.map((room, index) => (

                    <div  className="p-4 ">
                        <RoomActionCard {...room}/>
                        </div>
                ))}
            </div>
            <RoomDetailsForm />
        
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
