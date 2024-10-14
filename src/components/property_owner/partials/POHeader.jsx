import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaBuilding, FaSignOutAlt, FaUser } from "react-icons/fa";
import { BsBuildingAdd } from "react-icons/bs";
import Dropdown from '../../utils/Dropdown';   
import { AiFillMessage } from 'react-icons/ai';
import { setUserDetails } from '../../../redux/userSlice';
import {  handleDropdownAction, handleDropdownActionOwner } from '../../utils/logic';

const POHeader = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ left: 0, top: 0 });


  // Dropdown items
  const dropdownItems = [
    { title: 'Manage account', icon: <FaUser/> },
    { title: 'Manage Listings', icon: <FaBuilding/> },
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
    <header className="w-full py-3 bg-themeColor2 shadow-xl shadow-white relative">
      <div className="flex justify-between items-center mx- auto lessThan404 px-6 ">
        <div className="flex items-center space-x-1">
          <img src="/logo/white_invert.png" className="w-12 bg-orange-600 py-1 rounded-md" alt="Logo"/>
          <div className="text-2xl font-extrabold text-orange-600">HOSTHUNT</div>
        </div>
        <div className="flex items-center space-x-5 px-2">

          { user ?    (
  <div className="relative">
    <div onClick={toggleDropdown} className="flex items-center space-x-4 cursor-pointer">
      {user?.profilePic ? (
        <img src={user.profilePic} alt="Profile" className="w-9 h-9 rounded-full" />
      ) : (
        <button className="w-9 h-9 bg-gray-300 text-slate-900 rounded-full flex items-center outline outline-offset-1 outline-1  outline-gray-200 justify-center">
          <span className="text-base font-semibold">
            {user?.data?.name?.charAt(0).toUpperCase() || user?.data?.email?.charAt(0).toUpperCase() || ''}
          </span>
        </button>
      )}
      <i className="fa fa-bell text-xl"></i>
    </div>
  </div>
) : (
  <Link to="/host/login">
    <FaUser />
  </Link>
)}

        </div>
      </div>

      {dropdownOpen && (
        <Dropdown
        user_type={'user'}
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

export default POHeader;
