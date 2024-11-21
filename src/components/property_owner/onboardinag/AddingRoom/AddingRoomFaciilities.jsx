import React, { useEffect, useState } from 'react'
import { Card } from '../../../utils/cards/Card';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

function AddingRoomFaciilities() {
    const [facilities, setFacilities] = useState([]);

    const selectedRoomId = JSON.parse(localStorage.getItem('RoomId'));
    const storedFacilities = JSON.parse(localStorage.getItem('facilities'));
    console.log(storedFacilities?.facilities_ids,'stored facilities');
    
    const [selectedFacilities, setSelectedFacilities] = useState(
        storedFacilities && storedFacilities.facilities_ids ? storedFacilities.facilities_ids : []
    );
        console.log(selectedFacilities,'selected aacilities');
    const property_id = localStorage.getItem('property_id')
    const dispatch = useDispatch();
    const navigate = useNavigate()
    
    useEffect(() => {
        const loadFacilities = async () => {
            try {
                console.log('facility useEffect');
                const response = await fetchAllFacilities();
                setFacilities(response);
                console.log('Facilities fetched successfully:', response);
            } catch (error) {
                console.error('Error retrieving aacilities:', error);
            }
        };

        loadFacilities();
    }, []);

    // Toggle selection of an amenity
    const toggleFacilitySelection = (facilityId) => {
        setSelectedFacilities((prevSelected) =>
            prevSelected.includes(facilityId)
                ? prevSelected.filter((id) => id !== facilityId)
                : [...prevSelected, facilityId]
        );
    };

    const values = {
        facilities_ids:selectedFacilities,
        free: false ,
    }

  return (
    
    <>
    {selectedRoomId?(
          <>
          <div className="mb-6 p-4 border rounded-xl bg-gray-50 shadow-md">
          <h2 className="text-lg font-semibold">Selected Room Facilities</h2>
          <p className="mb-4 text-gray-600">These are the aacilities currently selected for your property.</p>
          
          {selectedFacilities.length > 0 ? (
              <>
                  <div className="flex flex-wrap gap-2">
                      {selectedFacilities.map((id) => {
                          const amenity = facilities.find((a) => a.id === id);
                          return (
                              <span
                                  key={id}
                                  className="bg-gray-300 text-themeColor2 px-3 py-1 rounded-lg"
                              >
                                  {amenity?.amenity_name}
                              </span>
                          );
                      })}
                  </div>
                  <button
                      type="submit"
                      className="px-6 py-2 mt-4 bg-themeColor text-white font-accent rounded-xl shadow-md hover:opacity-90"
                      onClick={() =>  handlecreateFacilitiesByProperty_Newlisting(values, property_id, dispatch, navigate)}
                      >
                      Save Facilities
                  </button>
              </>
              ) : (
                  <>
                  <p className="text-gray-500">No facilities selected</p>
                  </>
              )}
      </div>
          <div className='m-1'>
              <h2 className="text-lg font-semibold ">Available Room Facilities</h2>
              <p className="text-gray-600 mb-4">Select the facilities available at your property from the list below.</p>
  
              <>
              <Card className="flex flex-wrap gap-1 sm:gap-2 p-4 md:p-3 rounded-3xl bg-white border-slate-800 shadow-xl">
                  {facilities.length > 0 ? (
                      facilities.map((amenity) => (
                          <Button     
                              key={amenity.id}
                              startContent={amenity.icon}
                              onClick={() => toggleFacilitySelection(amenity.id)}
                              className={`${
                                  selectedFacilities.includes(amenity.id)
                                      ? 'bg-gradient-to-tr from-gray-500 to-slate-300 text-slate-800'
                                      : 'bg-gradient-to-tr from-gray-700 to-slate-800 text-white'
                              } shadow-lg rounded-md hover:scale-105 transition-all duration-150 flex-grow text-center py-2 px-4`}
                          >
                              {amenity.amenity_name}
                          </Button>
                      ))
                  ) : (
                      <p className="w-full text-center">No facilities available</p>
                  )}
              </Card>
              </>
          </div>
          </>
            ):
            (
                <div className=''>
                Complete the Room Details
                </div>
           )}
    
    </>
  )
}

export default AddingRoomFaciilities
