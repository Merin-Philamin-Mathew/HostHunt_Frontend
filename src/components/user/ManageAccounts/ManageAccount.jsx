import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Home, Lock, Search, Settings, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'  // Note the change from 'react-router' to 'react-router-dom'
import { useSelector } from 'react-redux'

const menuItems = [
  { icon: Home, label: 'My Stays', href: '/account/my-stays' },
  { icon: User, label: 'Profile', href: '/account/profile' },  // Explicitly set to '/profile'
  { icon: Bell, label: 'Notifications', href: 'account/notifications' },
  { icon: Lock, label: 'Account Security', href: 'account/security' },
  { icon: Settings, label: 'Settings', href: 'account/settings' },
]

export default function ManageAccount() {
  const [searchTerm, setSearchTerm] = useState('')
  
  const navigate = useNavigate()  // Use 'navigate' instead of 'router'
  const user = useSelector((state) => state.user.user);

  const filteredItems = menuItems.filter(item => 
    item.label.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleNavigation = (href) => {
    navigate(href);  // Use navigate function directly
  }

  return (
    <div className="py-4 sm:py-6 lg:py-8">
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16 border-2 border-themeColor2li8">
              <AvatarImage src="/placeholder.svg" alt="User" />
              <AvatarFallback>HH</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.data.name}!</h1>
              <p className="text-gray-600">Manage your HostHunt experience</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            className="pl-10 bg-white shadow-lg"
            placeholder="Search account settings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item, index) => (
            <Card 
              key={index} 
              className="group shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => handleNavigation(item.href)}  // Use the new handleNavigation function
            >
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="mb-4 p-3 bg-blue-100 rounded-full group-hover:bg-orange-200 transition-colors duration-300">
                  <item.icon className="w-8 h-8 text-thborder-x-themeColor2li8" />
                </div>
                <h2 className="text-lg font-semibold mb-2">{item.label}</h2>
                <p className="text-sm text-gray-600">
                  {getDescription(item.label)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="outline">Book a Stay</Button>
            <Button variant="outline">List Your Space</Button>
            <Button variant="outline">View Bookings</Button>
            <Button variant="outline">Contact Support</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function getDescription(label) {
  switch (label) {
    case 'My Stays':
      return 'View and manage your bookings'
    case 'Profile':
      return 'Update your personal information'
    case 'Notifications':
      return 'Manage your alert preferences'
    case 'Account Security':
      return 'Keep your account safe and secure'
    case 'Settings':
      return 'Adjust your account settings'
    default:
      return ''
  }
}