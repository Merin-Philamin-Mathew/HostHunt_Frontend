import React from 'react';
import { useSelector } from 'react-redux';

function Dropdown({ user_type = 'property_owner', profileIcon, items = [], onClick, position }) {
  // Determine user based on the user_type
  const owner = useSelector((state) => state.owner.owner);
  const regularUser = useSelector((state) => state.user.user);
  
  const user = user_type === 'user' ? regularUser : owner;

  return (
    <div
      className="absolute z-50 w-56 bg-gray-100 rounded-lg shadow-2xl"
      style={{
        left: `${position.left}px`,
        top: `${position.top}px`,
      }}
    >
      {/* Profile Section */}
      <div className="flex items-center p-4 space-x-3 border-b border-gray-100">
        {/* Profile Icon */}
        {profileIcon ? (
          <img src={profileIcon} alt="Profile" className="w-10 h-10 rounded-full" />
        ) : (
          <div className="w-10 h-10 bg-themeColor text-white rounded-full flex items-center justify-center">
            <span className="text-lg font-bold">
              {user?.data?.name?.charAt(0).toUpperCase() || user?.data?.email.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        {/* Username */}
        <div>
          <div className="text-lg font-bold text-gray-900">{user?.data?.name || 'User Name'}</div>
        </div>
      </div>

      {/* Dropdown Menu Items */}
      <ul className="py-2 text-sm text-gray-700">
        {items.map((each, index) => (
          <li key={index}>
            <a
              href="#"
              onClick={() => onClick(each?.title)}
              className={`flex items-center px-4 py-3 hover:bg-gray-200`}
            >
              <span className="mr-3">{each?.icon}</span> {each?.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dropdown;
