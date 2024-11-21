import { useState } from 'react'
import { PropertyAmenities } from './PropertyAmenities'
import {RoomFacilities} from './RoomFacilities'
import BedTypes from './BedTypes'
import {RoomTypes} from './RoomTypes'
import {  Tabs, TabsList, TabsTrigger, TabsContent } from '../../../components/utils/Tabs/Tabs'

export default function PropertyConfigurations() {
  const [activeTab, setActiveTab] = useState('amenities')

  const tabs = [
    { id: 'amenities', label: 'Property Amenities', component: PropertyAmenities },
    { id: 'facilities', label: 'Room Facilities', component: RoomFacilities },
    { id: 'roomTypes', label: 'Room Types', component: RoomTypes },
    { id: 'bedTypes', label: 'Bed Types', component: BedTypes },
  ]

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || PropertyAmenities

  return (
    <div className="mx-auto py-2 h-full flex flex-col">
    <Tabs className="h-full mb-10">
      <TabsList className="flex-shrink-0 bg-slate-500">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              isActive={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              variant="default"
            >
              {tab.label}
            </TabsTrigger>
            
          ))}
        </TabsList>
        
    
        <TabsContent className="flex-grow h-full min-h-0flex flex-col">
          <ActiveComponent />
        </TabsContent>
         </Tabs>
    </div>
  )
}
