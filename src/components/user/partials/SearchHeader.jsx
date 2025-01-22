import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaBuilding, FaSignOutAlt, FaUser } from "react-icons/fa";
import { BsBuildingAdd } from "react-icons/bs";
import { AiFillMessage } from 'react-icons/ai';
import { handleDropdownAction } from '../../utils/logic';
import PropertyLocationSearch from '../HomePage/PropetyLocationSearch';
import SmContainer from '../../utils/Containers/SmContainer';
import Container from '../../utils/Containers/Container';
import ProfileIcon_dropDown from '@/components/utils/dropDown/ProfileIcon_dropDown';

const SearchHeader = () => {
  const { user,userLoggedIn } = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <header className=" w-full py-3 bg-white shadow-xl relative">
      
        <Container>
      <div className="flex justify-between items-center mx-auto ">
        <button className="flex items-center space-x-1"
          onClick={() => navigate('/')} 
  >
          <img src="/logo/Orange.png" className="w-10" alt="Logo"/>
          <div className="hidden lg:block text-2xl font-extrabold text-orange-600">HOSTHUNT</div>
        </button>
     <div className=" bg-white rounded-lg border border-gray-400 w-1/2 md:w-3/4 lg:w-3/6">
        <PropertyLocationSearch />
        </div>
        <div className="flex items-center ">
     
          { userLoggedIn ?    (
  <>
          <ProfileIcon_dropDown classname={'bg-themeColor2li8 text-white'}/>

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


    
    </Container>
    </header>

  );
};

export default SearchHeader;
