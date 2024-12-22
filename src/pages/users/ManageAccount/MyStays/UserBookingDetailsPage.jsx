import UserBookingDetails from '@/components/user/ManageAccounts/MyStays/UserBookingDetails'
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react'
import React from 'react'
import { useParams } from 'react-router'

function UserBookingDetailsPage() {
    const { id } = useParams()
    
  return (
    <div>
            <div className='py-4'>

           <Breadcrumbs>
      <BreadcrumbItem href="/account/">Account</BreadcrumbItem>
      <BreadcrumbItem href="/account/my-stays">My Stays</BreadcrumbItem>
      <BreadcrumbItem href={`/account/my-stays/${id}`}>Stay Details</BreadcrumbItem>
    </Breadcrumbs>
    </div>
    <h1 className="text-3xl my-8 font-bold">Stay Details</h1>

      <UserBookingDetails/>
    </div>
  )
}

export default UserBookingDetailsPage
