"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Clock, CigaretteIcon, PawPrint, Wine, Users, Baby, Moon, Calendar, Bell, Ban, CreditCard } from "lucide-react"

// Dummy data for demonstration
const dummyPolicies = {
  check_in_time: "06:99:00",
  check_out_time: "20:45:00",
  smoking: "yes",
  pets_permit: true,
  drinking_permit: true,
  gender_restriction: "no_restriction",
  visitors: true,
  guardian: false,
  child_permit: true,
  child_from_age: 1,
  child_to_age: 18,
  curfew: false,
  curfew_from_time: null,
  curfew_to_time: null,
  min_nights: 1,
  max_nights: 30,
  notice_period: 0,
  free_cancellation: false,
  cancellation_period: 0,
  caution_deposit: 2000,
}

export default function PD_PoliciesViewModal({ policies = dummyPolicies }) {
  const [open, setOpen] = useState(false)

  const PolicyItem = ({ icon, title, value }) => (
    <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors">
      {icon}
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-gray-500">{value}</p>
      </div>
    </div>
  )

  const policyItems = [
    {
      icon: <Clock className="h-5 w-5 text-blue-500" />,
      title: "Check-in / Check-out",
      value: `${policies.check_in_time.slice(0, 5)} / ${policies.check_out_time.slice(0, 5)}`,
    },
    {
      icon: <CigaretteIcon className="h-5 w-5 text-red-500" />,
      title: "Smoking",
      value: policies.smoking === "yes" ? "Allowed" : "Not allowed",
    },
    {
      icon: <PawPrint className="h-5 w-5 text-green-500" />,
      title: "Pets",
      value: policies.pets_permit ? "Welcome" : "Not allowed",
    },
    {
      icon: <Wine className="h-5 w-5 text-purple-500" />,
      title: "Drinking",
      value: policies.drinking_permit ? "Permitted" : "Not permitted",
    },
    {
      icon: <Users className="h-5 w-5 text-indigo-500" />,
      title: "Visitors",
      value: policies.visitors ? "Allowed" : "Not allowed",
    },
    {
      icon: <Baby className="h-5 w-5 text-pink-500" />,
      title: "Children",
      value: policies.child_permit ? `Ages ${policies.child_from_age}-${policies.child_to_age} welcome` : "Not allowed",
    },
    {
      icon: <Moon className="h-5 w-5 text-yellow-500" />,
      title: "Curfew",
      value: policies.curfew ? `${policies.curfew_from_time} - ${policies.curfew_to_time}` : "No curfew",
    },
    {
      icon: <Calendar className="h-5 w-5 text-orange-500" />,
      title: "Stay duration",
      value: `${policies.min_nights} - ${policies.max_nights} nights`,
    },
    {
      icon: <Bell className="h-5 w-5 text-teal-500" />,
      title: "Notice period",
      value: `${policies.notice_period} day(s)`,
    },
    {
      icon: <Ban className="h-5 w-5 text-red-500" />,
      title: "Cancellation",
      value: policies.free_cancellation
        ? "Free cancellation"
        : `Cancellation period: ${policies.cancellation_period} day(s)`,
    },
    {
      icon: <CreditCard className="h-5 w-5 text-gray-500" />,
      title: "Caution deposit",
      value: `$${policies.caution_deposit}`,
    },
  ]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">View Policies & Services</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Policies & Services</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          {policyItems.map((item, index) => (
            <PolicyItem key={index} icon={item.icon} title={item.title} value={item.value} />
          ))}
        </div>
        <div className="flex justify-between items-center">
          <Badge variant="outline" className="text-xs">
            {policies.gender_restriction === "no_restriction" ? "No gender restriction" : "Gender restricted"}
          </Badge>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

