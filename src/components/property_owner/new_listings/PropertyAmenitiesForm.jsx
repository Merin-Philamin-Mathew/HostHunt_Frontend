import React, { useEffect, useState } from 'react';
import {  fetchAllAmenities, handlecreateAmenitiesByProperty_Newlisting,  } from '../../../features/Property/PropertyActions';
import { Button } from '@nextui-org/react';
import { Card } from '../../utils/cards/Card';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

function PropertyAmenitiesForm() {
    const [amenities, setAmenities] = useState([]);

    const storedAmenities = JSON.parse(localStorage.getItem('amenities'));
    console.log(storedAmenities?.amenities_ids,'stored amenities');
    
    const [selectedAmenities, setSelectedAmenities] = useState(
        storedAmenities && storedAmenities.amenities_ids ? storedAmenities.amenities_ids : []
    );
        console.log(selectedAmenities,'selected amenities');
    const property_id = localStorage.getItem('property_id')
    const dispatch = useDispatch();
    const navigate = useNavigate()
    
    useEffect(() => {
        const loadAmenities = async () => {
            try {
                console.log('amenity useEffect');
                const response = await fetchAllAmenities();
                setAmenities(response);
                console.log('Amenities fetched successfully:', response);
            } catch (error) {
                console.error('Error retrieving amenities:', error);
            }
        };

        loadAmenities();
    }, []);

    // Toggle selection of an amenity
    const toggleAmenitySelection = (amenityId) => {
        setSelectedAmenities((prevSelected) =>
            prevSelected.includes(amenityId)
                ? prevSelected.filter((id) => id !== amenityId)
                : [...prevSelected, amenityId]
        );
    };

    const values = {
        amenities_ids:selectedAmenities,
        free: false ,
    }

    return (
        <>
            <div className="mb-6 p-4 border rounded-xl bg-gray-50 shadow-md">
                <h2 className="text-lg font-semibold">Selected Amenities</h2>
                <p className="mb-4 text-gray-600">These are the amenities currently selected for your property.</p>
                
                {selectedAmenities.length > 0 ? (
                <>
                    <div className="flex flex-wrap gap-2">
                        {selectedAmenities.map((id) => {
                            const amenity = amenities.find((a) => a.id === id);
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
                    onClick={() =>  handlecreateAmenitiesByProperty_Newlisting(values, property_id, dispatch, navigate)}
                    >
                    Save Amenities
                </button>
               </>
                ) : (
                    <>
                    <p className="text-gray-500">No amenities selected</p>
                    </>
                )}
                
            </div>

            <h2 className="text-lg font-semibold">Available Amenities</h2>
            <p className="text-gray-600 mb-4">Select the amenities available at your property from the list below.</p>

            <>
            <Card className="flex flex-wrap gap-1 sm:gap-2 p-4 md:p-3 rounded-3xl bg-white border-slate-800 shadow-xl">
                {amenities.length > 0 ? (
                    amenities.map((amenity) => (
                        <Button
                            key={amenity.id}
                            startContent={amenity.icon}
                            onClick={() => toggleAmenitySelection(amenity.id)}
                            className={`${
                                selectedAmenities.includes(amenity.id)
                                    ? 'bg-gradient-to-tr from-gray-500 to-slate-300 text-slate-800'
                                    : 'bg-gradient-to-tr from-gray-700 to-slate-800 text-white'
                            } shadow-lg rounded-md hover:scale-105 transition-all duration-150 flex-grow text-center py-2 px-4`}
                        >
                            {amenity.amenity_name}
                        </Button>
                    ))
                ) : (
                    <p className="w-full text-center">No amenities available</p>
                )}
            </Card>
        </>
        </>
    );
}

export default PropertyAmenitiesForm;
