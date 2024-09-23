import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { BsBuildingAdd } from "react-icons/bs";



const Header = () => {
  const { isLoggedIn, user } = useSelector((state) => state.user);
  console.log(isLoggedIn);
  

  return (
    <header className="w-full py-4 bg-white shadow-md mb-2">
      <div className='flex justify-between items-center mx-auto lessThan404 max-w-[1440px] px-10'>
        <div className='flex items-center space-x-1'>
          <img src="\logo\Orange.png" className='w-10 '/>
      <div className="text-2xl font-extrabold text-orange-600">HOSTHUNT</div>
        </div>
      <div className="flex items-center space-x-5 px-2">
        <button className='flex space-x-1 items-center hover:bg-gray-100 py-2 px-3 border border-gray-400 rounded-full '>
        <BsBuildingAdd/> 
        <Link to="/list-property" className=" text-black hover:text-black">List Your Property</Link>
        
        </button>
        {isLoggedIn ? (
          <div className="flex items-center space-x-4 ">
            <img src={user.profilePic} alt="Profile" className="w-8 h-8 rounded-full" />
            <i className="fa fa-bell text-xl"></i>
          </div>
        ) : (
          <Link to="/login">
            <FaUser/>
          </Link>
        )}
      </div>
      </div>
    </header>
  );
};

export default Header;
