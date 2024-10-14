import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ items = [] }) => {
  return (
    <div className="space-y-3">
      <ul className="space-y-1">
        {items.map((item, index) => (
          <li key={index}>
             <Link
              to={item.disabled ? '#' : item.link}  // Disable link navigation if the item is disabled
              className={`flex items-center py-2 pl-2 md:pl-3  md:pr-7 ${
                item.disabled
                  ? ' text-gray-400 cursor-not-allowed rounded-full transition'
                  : 'hover:bg-gray-200 rounded-full transition'
              }`}
              aria-disabled={item.disabled}
            >
                <span className="mr-3">{item.icon}</span>
                <span className="hidden sm:inline">{item.title}</span>
              </Link>

          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
