import React, { useEffect } from 'react'
import PropertyResultCard from '../../utils/cards/PropertyResultCard'
import { fetchAllPropertyResults } from '../../../features/Property/PropertyActions';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';

function ResultsContent() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const Term = queryParams.get('query');
  
    const dispatch = useDispatch();
  
    useEffect(() => {
      fetchAllPropertyResults(Term, dispatch);
    }, [Term, dispatch]);
  
    const allPropertyResults = useSelector((state) => state.property.allPropertyResults);
    console.log('Property Results:', allPropertyResults);

  return (
    <div>
       <main className="flex-grow py-6">
                <h1 className="text-xl font-semibold mb-4">Property Results for "{Term}"</h1>
                <PropertyResultCard allPropertyResults={allPropertyResults} />
        </main>
    </div>
  )
}

export default ResultsContent
