import React, { useEffect, useState } from 'react';
import { fetchAllAmenities } from '../../../features/Property/PropertyActions';
import { Button } from '@nextui-org/react';
import { Card } from '../../utils/cards/Card';

function PropertyAmenities() {
    const [amenities, setAmenities] = useState([]);
    const [selectedAmenities, setSelectedAmenities] = useState([]);

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

    return (
        <>
            {/* Display Selected Amenities */}
            <div className="mb-6 p-4 border rounded-xl bg-gray-50 shadow-md">
                <h2 className="text-lg font-semibold">Selected Amenities</h2>
                <p className="mb-4">Choose the facilities you provide</p>
                {selectedAmenities.length > 0 ? (
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
                ) : (
                    <p className="text-gray-500">No amenities selected</p>
                )}
            </div>
            
            <h2 className="text-lg font-semibold ">Amenities Available</h2>
            {/* Amenities Selection Card */}
            <Card className="flex flex-wrap gap-1 sm:gap-2 p-4 md:p-3 rounded-3xl bg-white border-slate-800 shadow-xl">
            {amenities.length > 0 ? (
                    amenities.map((amenity) => (
                        <div key={amenity.id} className="flex-grow">
                            <Button
                                startContent={amenity.icon}
                                onClick={() => toggleAmenitySelection(amenity.id)}
                                className={`${
                                    selectedAmenities.includes(amenity.id)
                                        ? 'bg-gradient-to-tr from-gray-500 to-slate-300  text-slate-800  '
                                        : 'bg-gradient-to-tr from-gray-700 to-slate-800 text-white '
                                } shadow-lg rounded-md hover:scale-105 transition-all duration-150`}
                            >
                                {amenity.amenity_name}
                            </Button>
                        </div>
                    ))
                ) : (
                    <p className="w-full text-center">No amenities available</p>
                )}
            </Card>
        </>
    );
}

export default PropertyAmenities;
