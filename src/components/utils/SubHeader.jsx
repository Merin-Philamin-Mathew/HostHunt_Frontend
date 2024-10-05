import React from 'react';
import { useSelector } from 'react-redux';
import { FaPlus } from "react-icons/fa6";

function SubHeader() {
    const { owner } = useSelector((state) => state.owner);
    
    const name = owner.name

    return (
        <div>
            <header className=" mb-8 pr-3">
                <h1 className="text-3xl font-bold">Hi {name}</h1>
                <div className=''>
                    <p className="text-gray-600">This is where you can manage all your listings.</p>
              
                </div>
                {/* Spread the buttonProps */}
            </header>
        </div>
    );
}

export default SubHeader;
