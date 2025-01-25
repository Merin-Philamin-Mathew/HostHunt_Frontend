import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Check, Edit, Upload } from 'lucide-react'
import VerificationModal from './VerificationModal'
import ProfileEditModal from './ProfileEditModal'
import ProfilePictureUpload from './ProfilePictureUpload'

export default function Profile() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false)
  const user = useSelector((state) => state.user.user);
  const verificationStatus = user?.identity_verification?.status  
  const profile = user?.profile_pic
  // if (!profile) {
  //   return (
  //     <div className="container mx-auto p-8 max-w-2xl text-center space-y-6">
  //       <h1 className="text-3xl font-bold">It's time to create your profile</h1>
  //       <p className="text-muted-foreground text-lg">
  //         Your profile is an important part of every reservation. Create yours to help other Hosts and guests get to know you.
  //       </p>
  //       <Button 
  //         size="lg" 
  //         className="bg-[#ff385c] hover:bg-[#ff385c]/90"
  //         onClick={() => setIsEditModalOpen(true)}
  //       >
  //         Create profile
  //       </Button>
  //     </div>
  //   )
  // }
console.log('user',user)
  return (
    <>
      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        {/* Left Column */}
        <div className="space-y-4 ">
          <Card className="shadow-xl">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-3">
             <ProfilePictureUpload profile={profile} user={user}/>


                <div>
                  <h2 className="text-2xl font-bold">{user?.data?.name?.split(' ')[0]}</h2>
                  <p className="text-muted-foreground">Guest</p>
                </div>
                <div className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">1</span> Month on HostHunt
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl">
            <CardContent className="py-4">
              <h3 className="font-semibold mb-4">Confirmed information</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-green-500" />
                  Email address
                </div>
                {profile?.phone_number && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-green-500" />
                    Phone number
                  </div>
                )}
                {verificationStatus==='verified' && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-green-500" />
                    Phone number
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* {verificationStatus === null ? (
            <Card className="shadow-xl">
              <CardContent className="py-4 space-y-4">
                <h3 className="font-semibold">Verify your identity</h3>
                <p className="text-sm text-muted-foreground">
                  Before you book or host, you'll need to complete this step.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setIsVerificationModalOpen(true)}
                >
                  Get verified
                </Button>
              </CardContent>
            </Card>
          ):verificationStatus==='in_review'?( <Card className="shadow-xl">
            <CardContent className="py-4 space-y-4">
              <h3 className="font-semibold">Verificaiton on Review</h3>
              <p className="text-sm text-muted-foreground">
              Admin is reviewing your verification request. You will be notified once it is approved.
              </p>
            </CardContent>
          </Card>):verificationStatus==='rejected'?(
               <Card className="shadow-xl">
               <CardContent className="py-4 space-y-4">
                 <h3 className="font-semibold">Verify your identity</h3>
                 <p className="text-sm text-muted-foreground">
                  Admin has rejected your verification request. Please try again.
                 </p>
                 <Button 
                   variant="outline" 
                   className="w-full"
                   onClick={() => setIsVerificationModalOpen(true)}
                 >
                    
                 </Button>
               </CardContent>
             </Card>
          ):null} */}
       
       
        </div>

        {/* Right Column */}
{!profile?.phone_number ? (
  <div className='flex flex-col justify-center'>
  <div className="container mx-auto p-8 max-w-2xl text-center space-y-6">
    <h1 className="text-3xl font-bold">It's time to create your profile</h1>
    <p className="text-muted-foreground text-md">
      Your profile is an important part of every reservation. Create yours to help other Hosts and guests get to know you.
    </p>
    <Button 
      size="lg" 
      className="bg-themeColor hover:opacity-85 hover:bg-themeColor"
      onClick={() => setIsEditModalOpen(true)}
    >
      Create profile
    </Button>
  </div>
  </div>
) : (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold">About {profile?.user?.email?.split('@')[0]}</h1>
      <Button variant="outline" onClick={() => setIsEditModalOpen(true)}>
        <Edit className="w-4 h-4 mr-2" />
        Edit profile
      </Button>
    </div>

    <div className="space-y-6">
      {profile?.about_me && (
        <div>
          <h3 className="font-semibold mb-2">About me</h3>
          <p className="text-muted-foreground">{profile?.about_me}</p>
        </div>
      )}

      {profile?.description_as_host && (
        <div>
          <h3 className="font-semibold mb-2">As a host</h3>
          <p className="text-muted-foreground">{profile?.description_as_host}</p>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {profile?.gender && (
          <div>
            <h3 className="font-semibold mb-1">Gender</h3>
            <p className="text-muted-foreground capitalize">{profile?.gender}</p>
          </div>
        )}
        {profile?.date_of_birth && (
          <div>
            <h3 className="font-semibold mb-1">Date of birth</h3>
            <p className="text-muted-foreground">
              {new Date(profile?.date_of_birth).toLocaleDateString()}
            </p>
          </div>
        )}
        {profile?.address && (
          <div>
            <h3 className="font-semibold mb-1">Address</h3>
            <p className="text-muted-foreground">{profile?.address}</p>
          </div>
        )}
      </div>
    </div>
  </div>
)}

      
      </div>

      <ProfileEditModal 
        open={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
      />
      
      <VerificationModal
        open={isVerificationModalOpen}
        onClose={() => setIsVerificationModalOpen(false)}
      />
    </>
  )
}

