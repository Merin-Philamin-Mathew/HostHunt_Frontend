import Profile from '@/components/user/ManageAccounts/Profile/Profile'
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react'
import React from 'react'

function ProfilePage() {
  return (
    <>
    <div className='py-4'>
    <Breadcrumbs>
        <BreadcrumbItem href="/account" className=''>Account</BreadcrumbItem>
        <BreadcrumbItem href="/account/profile">Profile</BreadcrumbItem>
    </Breadcrumbs>  
    </div>
    
      <Profile/>
    </>
  )
}

export default ProfilePage
