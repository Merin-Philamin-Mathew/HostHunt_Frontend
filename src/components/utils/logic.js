import { logout } from "../../redux/userSlice";

// logic.js
export const handleDropdownAction = (itemName, dispatch, navigate) => {
  console.log('itemName',itemName);
  
    switch (itemName) {
      case 'Sign out':
        // Clear localStorage
        localStorage.removeItem('user_data');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
  
        // Dispatch Redux logout action
        dispatch(logout());
  
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
  