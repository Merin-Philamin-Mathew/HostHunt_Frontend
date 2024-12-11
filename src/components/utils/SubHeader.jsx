import React from 'react';
import { useSelector } from 'react-redux';
import { FaPlus } from "react-icons/fa6";

function SubHeader({ title,buttonProps }) {
    const { user } = useSelector((state) => state.user);
    
    const name = user?.data?.name.split(' ')[0]
    return (
        <div>
            <header className=" mb-8 pr-3">
                <h1 className="text-3xl font-bold">Hi {name}!</h1>
                <div className=''>
                    <p className="text-gray-600">This is where you can manage all your listings.</p>
              
                </div>

                {/* <h1 className='font-semibold'>{title}</h1> */}
                {/* Spread the buttonProps */}
            </header>
        </div>
    );
}

export default SubHeader;
