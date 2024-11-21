    import React, { useEffect } from 'react'
    import SearchHeader from '../../components/user/partials/SearchHeader'
    import { Accordion, AccordionItem, Checkbox, Button, Input } from '@nextui-org/react'
    import {  Search, Star } from 'lucide-react'
    import { useLocation } from 'react-router'
    import { fetchAllPropertyResults } from '../../features/Property/PropertyActions'
    import { useDispatch, useSelector } from 'react-redux'
import Footer from '../../components/user/partials/Footer'
import PropertyResultCard from '../../components/utils/cards/PropertyResultCard'
import SmContainer from '../../components/utils/Containers/SmContainer'


    function PropertyResultsPage() {
        const location = useLocation()
        const queryParams = new URLSearchParams(location.search)
        const Term = queryParams.get('query')
        
        const dispatch = useDispatch()
        useEffect(() => {
        const data = fetchAllPropertyResults(Term, dispatch)
        }, []);

        const allPropertyResults = useSelector((state) => state.property.allPropertyResults);
        console.log('all not getting printed', allPropertyResults);
        

        const propertyTypes = ['All', 'Budget Hotels', 'Near Beach PGs', 'Hostels', 'Apartments']
    
        const filters = [
        {
            title: 'Price Range',
            items: [
            { label: '₹0 - ₹500', count: 200 },
            { label: '₹501 - ₹1,000', count: 150 },
            { label: '₹1,001 - ₹2,000', count: 100 },
            { label: '₹2,001 - ₹3,000', count: 50 },
            ]
        },
        {
            title: 'Rating',
            items: [
            { label: 'Free cancellation', count: 300 },
            { label: 'Low WiFi', count: 150 },
            { label: 'Air Conditioning', count: 200 },
            { label: 'Internet Access', count: 250 },
            ]
        },
        {
            title: 'Room Types',
            items: [
            { label: 'Private Rooms', count: 300 },
            { label: 'Single Rooms', count: 150 },
            { label: 'Double Rooms', count: 200 },
            { label: 'Family Rooms', count: 250 },
            ]
        }
        ]
   
    return (
        <>
         <div className="relative min-h-screen flex flex-col bg-gray-100">

            <div className="sticky top-0 z-50">
            <SearchHeader/>
            </div>

                    {/* sidebar */}
                    <div className="flex flex-grow py-8 ">
                    <SmContainer>

                        <aside className="relative ">
                        <div className="sticky top-[100px]">

                        <div className="pt-5 pb-3 px-3 w-60 rounded-3xl my-3 bg-gray-300 ">
                        <Input
                        type="email"
                        label="Search by property name"
                        placeholder="eg: Zostel hostel"
                        labelPlacement="outside"
                        startContent={
                            <Search className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        />
                            </div>

                        <div className="py-3 px-1 w-60 rounded-3xl my-3 bg-gray-300 shadow-xl">
                            <div className='px-3 pb-1 text-sm'>Filter by</div>
                            <Accordion variant="splitted" isCompact>
                                {filters.map((filter, index) => (
                                <AccordionItem
                                    key={index}
                                    aria-label={filter.title}
                                    title={filter.title}
                                >
                                    <div className="space-y-2">
                                    {filter.items.map((item, itemIndex) => (
                                        <div key={itemIndex} className="flex items-center justify-between">
                                        <Checkbox size="sm"
                                                    color='warning'
                                                    radius='full'>
                                            {item.label}
                                        </Checkbox>
                                        {/* <span className="text-sm text-gray-500">({item.count})</span> */}
                                        </div>
                                    ))}
                                    </div>
                                </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                        
                        
                        </div>
                        </aside>

                        </SmContainer>

                    {/* results content */}
                    <SmContainer>

                    <main className="flex-grow py-6 overflow-y-auto">
                    <div>
            <h1>Property Results for {Term}</h1>
                                <PropertyResultCard allPropertyResults={allPropertyResults}/>
                 </div>
                    </main>
                    </SmContainer>

            
                </div>
          
        </div>

<Footer/>
        </>
    )
    }

    export default PropertyResultsPage
