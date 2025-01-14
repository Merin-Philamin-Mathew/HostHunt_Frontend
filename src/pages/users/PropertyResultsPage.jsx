import React, { useEffect } from 'react';
import SearchHeader from '../../components/user/partials/SearchHeader';
import { Accordion, AccordionItem, Checkbox, Input } from '@nextui-org/react';
import { Search } from 'lucide-react';
import { useLocation } from 'react-router';
import { fetchAllPropertyResults } from '../../features/Property/PropertyActions';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../../components/user/partials/Footer';
import PropertyResultCard from '../../components/utils/cards/PropertyResultCard';
import SmContainer from '../../components/utils/Containers/SmContainer';

function PropertyResultsPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const Term = queryParams.get('query');

  const dispatch = useDispatch();

  useEffect(() => {
    fetchAllPropertyResults(Term, dispatch);
  }, [Term, dispatch]);

  const allPropertyResults = useSelector((state) => state.property.allPropertyResults);
  console.log('Property Resultds:', allPropertyResults);

  const filters = [
    {
      title: 'Price Range',
      items: [
        { label: '₹0 - ₹500', count: 200 },
        { label: '₹501 - ₹1,000', count: 150 },
        { label: '₹1,001 - ₹2,000', count: 100 },
        { label: '₹2,001 - ₹3,000', count: 50 },
      ],
    },
    {
      title: 'Rating',
      items: [
        { label: 'Free cancellation', count: 300 },
        { label: 'Low WiFi', count: 150 },
        { label: 'Air Conditioning', count: 200 },
        { label: 'Internet Access', count: 250 },
      ],
    },
    {
      title: 'Room Types',
      items: [
        { label: 'Private Rooms', count: 300 },
        { label: 'Single Rooms', count: 150 },
        { label: 'Double Rooms', count: 200 },
        { label: 'Family Rooms', count: 250 },
      ],
    },
  ];

  return (
    <>
      <div className="relative min-h-screen flex flex-col bg-gray-100">
        <div className="sticky top-0 z-50">
          <SearchHeader />
        </div>

        {/* Main Content */}
        <div className="flex flex-grow py-8">
          <SmContainer>
            <div className="flex gap-16">
             

              {/* Results Content */}
              <main className="py-6">
                <h1 className="text-xl font-semibold mb-4">Property Results for "{Term}"</h1>
                <PropertyResultCard allPropertyResults={allPropertyResults} />
              </main>
            </div>
          </SmContainer>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}

export default PropertyResultsPage;
