import React, { useEffect, useState } from 'react';
import { Card } from '../../../utils/cards/Card';
import { useDispatch, useSelector } from 'react-redux';
import { fetchActiveRoomFacilities } from '../../../../features/Property/PropertyActions';
import { setRoomFacilities } from '../../../../features/Property/PropertySlice';

function AddingRoomFacilities() {
  const [facilities, setFacilities] = useState([]);
  const dispatch = useDispatch();
  const selectedFacilities = useSelector((state) => state.property.RoomFacilities || []);

  useEffect(() => {
    fetchActiveRoomFacilities(setFacilities);
  }, []);

  // Toggle selection of a facility
  const toggleFacilitySelection = (facilityId) => {
    const updatedFacilities = selectedFacilities.includes(facilityId)
      ? selectedFacilities.filter((id) => id !== facilityId)
      : [...selectedFacilities, facilityId];

    // Update the Redux state
    dispatch(setRoomFacilities(updatedFacilities));
  };

  return (
    <div>
      <div className="mb-6 p-4 border rounded-xl bg-gray-50 shadow-md">
        <h2 className="text-lg font-semibold">Selected Room Facilities</h2>
        <p className="mb-4 text-gray-600">These are the facilities currently selected for your property.</p>

        {selectedFacilities?.length > 0 ? (
          <div>
            <div className="flex flex-wrap gap-2">
              {selectedFacilities.map((id) => {
                const facility = facilities.find((facility) => facility.id === id);
                return (
                  <span key={id} className="bg-gray-300 text-themeColor2 px-3 py-1 rounded-lg">
                    {facility?.facility_name}
                  </span>
                );
              })}
            </div>
          </div>
        ) : (
          <p className="text-gray-500">No facilities selected</p>
        )}
      </div>

      <div className="m-1">
        <h2 className="text-lg font-semibold">Available Room Facilities</h2>
        <p className="text-gray-600 mb-4">Select the facilities available at your property from the list below.</p>

        <Card className="flex flex-wrap gap-1 sm:gap-2 p-4 md:p-3 rounded-3xl bg-white border-slate-800 shadow-xl">
          {facilities?.length > 0 ? (
            facilities.map((facility) => (
              <button
                key={facility.id}
                onClick={() => toggleFacilitySelection(facility.id)}
                className={`${
                  selectedFacilities?.includes(facility.id)
                    ? 'bg-gradient-to-tr from-gray-500 to-slate-700 text-slate-200'
                    : 'bg-gradient-to-tr from-gray-700 to-slate-800 text-white'
                } shadow-lg rounded-md hover:scale-105 transition-all duration-150 flex-grow text-center py-2 px-4`}
              >
                {facility.facility_name}
              </button>
            ))
          ) : (
            <p className="w-full text-center">No facilities available</p>
          )}
        </Card>
      </div>
    </div>
  );
}

export default AddingRoomFacilities;
