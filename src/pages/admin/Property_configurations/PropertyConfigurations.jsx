import { useState } from 'react'
import { PropertyAmenities } from './PropertyAmenities'
import {RoomFacilities} from './RoomFacilities'
import RoomTypes from './RoomTypes'
import BedTypes from './BedTypes'
import {  Tabs, TabsList, TabsTrigger, TabsContent } from '../../../components/utils/Tabs/Tabs'

export default function PropertyConfigurations() {
  const [activeTab, setActiveTab] = useState('amenities')

  const tabs = [
    { id: 'amenities', label: 'Property Amenities', component: PropertyAmenities },
    { id: 'facilities', label: 'Room Facilities', component: RoomFacilities },
    // { id: 'roomTypes', label: 'Room Types', component: RoomTypes },
    // { id: 'bedTypes', label: 'Bed Types', component: BedTypes },
  ]

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || PropertyAmenities

  return (
    <div className=" mx-auto py-2">
      <Tabs>
        <TabsList>
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
        
        <TabsContent>
          <ActiveComponent />
        </TabsContent>
      </Tabs>
    </div>
  )
}
