import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaBuilding, FaSignOutAlt, FaUser } from "react-icons/fa";
import { BsBuildingAdd } from "react-icons/bs";
import { AiFillMessage } from 'react-icons/ai';
import { handleDropdownAction } from '../../utils/logic';
import ProfileIcon_dropDown from '../../utils/dropDown/profileIcon_dropDown';

const Header = () => {
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
    <header className="w-full py-3 bg-white shadow-xl mb-2 relative">
      <div className="flex justify-between items-center mx-auto lessThan404 max-w-[1440px] px-10">

        <button className="flex items-center space-x-1"
          onClick={() => navigate('/')} 
          >
          <img src="/logo/Orange.png" className="w-10 " alt="Logo"/>

          <div className="text-2xl font-extrabold text-themeColor hidden md:inline">HOSTHUNT</div>
        </button>
        <div className="flex items-center space-x-5 px-2">
          <button className="flex space-x-1 items-center hover:bg-gray-100 py-2 px-3 border border-gray-400 rounded-full ">
            <BsBuildingAdd />
            {/* <Link to="/host/login" className="text-black hover:text-black">List Your Property</Link> */}
            <Link to={user ? "/host/listings" : "/login"} 
            className="text-black hover:text-black">List Your Property</Link>
          </button>

          { userLoggedIn ?    (
            <>


      <ProfileIcon_dropDown/>

  </>
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
    </header>
  );
};

export default Header;
