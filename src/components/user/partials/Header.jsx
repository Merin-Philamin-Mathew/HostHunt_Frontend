import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaBuilding, FaSignOutAlt, FaUser } from "react-icons/fa";
import { BsBuildingAdd } from "react-icons/bs";
import Dropdown from '../../utils/Dropdown';
import { AiFillMessage } from 'react-icons/ai';
import { handleDropdownAction } from '../../utils/logic';
import { setUserDetails } from '../../../redux/userSlice';

const Header = () => {
  const { user, isLoggedIn } = useSelector((state) => state.user);
  console.log(isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ left: 0, top: 0 });

  useEffect(() => {
    if (!user) {
      const user_data = JSON.parse(localStorage.getItem('user_data'));  // Fetch from local storage
      if (user_data) {
        dispatch(setUserDetails(user_data));  // Set user data in Redux
      }
    }
  }, [user, dispatch]);

  // Dropdown items
  const dropdownItems = [
    { title: 'Manage account', icon: <FaUser/> },
    { title: 'My Stays', icon: <FaBuilding/> },
    { title: 'Messages', icon: <AiFillMessage/>},
    { title: 'Sign out', icon: <FaSignOutAlt/>}
  ];

  // Calculate position for dropdown
  const toggleDropdown = (event) => {
    const iconPosition = event.target.getBoundingClientRect(); // Get icon position

    // Set the dropdown to align the right side with the profile icon's right side
    setDropdownPosition({
      left: iconPosition.right - 176, // Subtract width of dropdown (44 * 4) = 176px to align right edge
      top: iconPosition.bottom + window.scrollY + 20, // Position dropdown below icon
    });

    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="w-full py-3 bg-white shadow-xl mb-2 relative">
      <div className="flex justify-between items-center mx-auto lessThan404 max-w-[1440px] px-10">
        <div className="flex items-center space-x-1">
          <img src="/logo/Orange.png" className="w-10" alt="Logo"/>
          <div className="text-2xl font-extrabold text-orange-600">HOSTHUNT</div>
        </div>
        <div className="flex items-center space-x-5 px-2">
          <button className="flex space-x-1 items-center hover:bg-gray-100 py-2 px-3 border border-gray-400 rounded-full ">
            <BsBuildingAdd />
            <Link to="/property-owner/login" className="text-black hover:text-black">List Your Property</Link>
          </button>

          { user ?    (
  <div className="relative">
    <div onClick={toggleDropdown} className="flex items-center space-x-4 cursor-pointer">
      {user.profilePic ? (
        <img src={user.profilePic} alt="Profile" className="w-9 h-9 rounded-full" />
      ) : (
        <button className="w-9 h-9 bg-gray-700 text-slate-300 rounded-full flex items-center outline outline-offset-1 outline-1  outline-themeColor2 justify-center">
          <span className="text-base font-semibold">
            {user?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || ''}
          </span>
        </button>
      )}
      <i className="fa fa-bell text-xl"></i>
    </div>
  </div>
) : (
  <Link to="/login">
    <FaUser />
  </Link>
)}

        </div>
      </div>

      {dropdownOpen && (
        <Dropdown
          items={dropdownItems}
          onClick={(itemName) => {
            console.log(`${itemName} clicked`);
            handleDropdownAction(itemName, dispatch, navigate);
            setDropdownOpen(false); 
          }}
          position={dropdownPosition} // Pass calculated position
        />
      )}
    </header>
  );
};

export default Header;
