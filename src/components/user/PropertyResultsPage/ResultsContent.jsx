import React, { useEffect, useState } from 'react';
import { fetchPropertyCardDetailsUserSide } from '../../../features/Property/PropertyActions';
import { useSelector } from 'react-redux';
import PropertyDisplayCardUserSide from '../../utils/cards/PropertyResultCard';

function ResultsContent() {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const allPropertyResults = useSelector((state) => state.property.allPropertyResults);

  useEffect(() => {
    const fetchProperties = async () => {
      if (!allPropertyResults?.property_ids?.length) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchPropertyCardDetailsUserSide(allPropertyResults.property_ids);
        
        if (data) {
          setProperties(data);
        }
      } catch (err) {
        setError('Failed to fetch property details. Please try again later.');
        console.error('Error fetching properties:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, [allPropertyResults?.property_ids]);

  if (error) {
    return (
      <div className="flex-grow py-6">
        <div className="text-red-600 p-4 rounded-md bg-red-50">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div>
      <main className="flex-grow py-6">
        {isLoading ? (
          <div className="space-y-4">
            {/* Skeleton loader for properties */}
            {[1, 2, 3].map((n) => (
              <div 
                key={n} 
                className="h-48 bg-gray-200 rounded-lg animate-pulse mb-4"
              />
            ))}
          </div>
        ) : (
          <>
            <h1 className="text-xl font-semibold mb-4">
              {allPropertyResults?.total ? (
                `Over ${allPropertyResults.total} properties`
              ) : (
                'No properties found'
              )}
            </h1>
            
            {properties?.length > 0 ? (
              <PropertyDisplayCardUserSide properties={properties} />
            ) : (
              <div className="text-gray-500 text-center py-8">
                No properties available for the selected criteria
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default ResultsContent;