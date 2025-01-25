import React, { useRef, useState } from 'react';
import { editUplodedProfilePic, uploadProfilePic } from '@/features/Profile/ProfileAction';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setProfilePic } from '@/redux/userSlice';

const ProfilePictureSkeleton = () => {
    return (
      <div className="w-32 h-32 rounded-full bg-gray-200 animate-pulse">
        <div className="w-full h-full flex items-center justify-center text-gray-500">
          <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
      </div>
    );
  };
  
export  {ProfilePictureSkeleton};

const ProfilePictureUpload = ({profile, user}) => {
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch(); 

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsLoading(true);
      try {
        // Await the response here
        const response = profile 
          ? await editUplodedProfilePic(file)
          : await uploadProfilePic(file);
  
        console.log(response, 'profile pic response');
  
        // Adjust how you extract the profile pic URL
        const profilePicUrl = response.data?.profile_pic || response.profile_pic;
  
        if (profilePicUrl) {
          dispatch(setProfilePic(profilePicUrl));
          toast.success('Profile picture uploaded successfully');
        } else {
          throw new Error('Profile picture URL not found in response');
        }
      } catch (error) {
        console.error('error from propic', error);
        toast.error(error.message || 'Upload failed');
      } finally {
        setIsLoading(false);
      }
    }
  };
  if (isLoading) {
    return <ProfilePictureSkeleton />;
  }
  else {
    return (
        <>
          <input 
            type="file" 
            ref={fileInputRef}
            accept="image/*" 
            onChange={handleFileChange} 
            className="hidden"
          />
          <Avatar 
            className={`w-32 h-32 ${!profile ? 'bg-black' : ''} cursor-pointer relative`}
            onClick={handleAvatarClick}
          >
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <Loader2 className="h-8 w-8 animate-spin text-themeColor" />
              </div>
            ) : null}
            
            {profile? (
              <AvatarImage src={profile} />
            ) : (
              <AvatarFallback className="bg-black text-white">
                {user?.data?.name?.charAt(0).toUpperCase() || user?.data?.email?.charAt(0).toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>
        </>
      );
  }
 
};

export default ProfilePictureUpload;