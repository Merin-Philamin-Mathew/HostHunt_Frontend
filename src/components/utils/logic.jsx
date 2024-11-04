import { logoutUser } from "../../redux/userSlice";
import { logoutOwner } from "../../redux/ownerSlice";

// logic.js
export const handleDropdownAction = (itemName, dispatch, navigate) => {
  console.log('itemName',itemName);
  
    switch (itemName) {
      case 'Sign out':
  
        dispatch(logoutUser());
  
        navigate('/');
        break;
  
      case 'account':
        navigate('/account');
        break;
  
      case 'trips':
        navigate('/trips');
        break;
  
      case 'messages':
        navigate('/messages');
        break;
  
      default:
        console.log('Unknown action');
        break;
    }
  };
  
export const handleDropdownActionOwner = (itemName, dispatch, navigate) => {
  console.log('itemName',itemName);
  
    switch (itemName) {
      case 'Sign out':
  
        // Dispatch Redux logout action
        dispatch(logoutOwner());
  
        // Navigate to login page
        navigate('/');
        break;
  
      case 'account':
        // Navigate to account page
        navigate('/account');
        break;
  
      case 'trips':
        // Navigate to trips page
        navigate('/trips');
        break;
  
      case 'messages':
        // Navigate to messages page
        navigate('/messages');
        break;
  
      default:
        console.log('Unknown action');
        break;
    }
  };
  