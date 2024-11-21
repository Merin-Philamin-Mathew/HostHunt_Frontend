import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaBuilding, FaSignOutAlt, FaUser } from "react-icons/fa";
import { BsBuildingAdd } from "react-icons/bs";
import Dropdown from '../../utils/Dropdown';
import { AiFillMessage } from 'react-icons/ai';
import { handleDropdownAction } from '../../utils/logic';
import PropertyLocationSearch from '../HomePage/PropetyLocationSearch';
import SmContainer from '../../utils/Containers/SmContainer';

const SearchHeader = () => {
  const { user,userLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ left: 0, top: 0 });


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
      <header className=" w-full py-3 bg-white shadow-xl relative">
        <SmContainer>
      <div className="flex justify-between items-center mx-auto ">
        <button className="flex items-center space-x-1"
          onClick={() => navigate('/')} 
  >
          <img src="/logo/Orange.png" className="w-10" alt="Logo"/>
          <div className="hidden lg:block text-2xl font-extrabold text-orange-600">HOSTHUNT</div>
        </button>
     <div className="flex items-stretch bg-white rounded-lg border border-gray-400 w-3/4 md:w-2/3 lg:w-1/2">
        <PropertyLocationSearch/>
        </div>
        <div className="flex items-center ">
     
          { userLoggedIn ?    (
  <div className="relative">
    <div onClick={toggleDropdown} className="flex items-center  cursor-pointer">
      {user.userProPic ? (
        <img src={user.userProPic} alt="Profile" className="w-9 h-9 rounded-full" />
      ) : (
        <button className="w-9 h-9 bg-gray-700 text-slate-300 rounded-full flex items-center outline outline-offset-1 outline-1  outline-themeColor2 justify-center">
          <span className="text-base font-semibold">
            {user?.data?.name?.charAt(0).toUpperCase() || user?.data?.email?.charAt(0).toUpperCase() || ''}
          </span>
        </button>
      )}
      <i className="fa fa-bell text-xl"></i>
     
    </div>
  </div>
) : (
  <div className='flex justify-center'>
  <Link to="/login" className='flex items-center space-x-2'>
    <FaUser />
    <div>Login</div>
  </Link>
</div>
  
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
    </SmContainer>
    </header>

  );
};

export default SearchHeader;
