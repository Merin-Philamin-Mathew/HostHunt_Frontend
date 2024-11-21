import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ items = [], activePath }) => {
  return (
    <div className="space-y-3">
      <ul className="space-y-1">
        {items.map((item, index) => (
          <li key={index}>
            <Link
              to={item.disabled ? '#' : item.link} 
              className={`flex items-center py-2 pl-2 md:pl-3 md:pr-7 rounded-full transition ${
                item.disabled
                  ? 'text-gray-400 cursor-not-allowed'
                  : activePath === item.link
                  ? 'bg-slate-300 text-themeColor2' 
                  : 'hover:bg-gray-200'
              }`}
              aria-disabled={item.disabled}
            >
              <span className="mr-3">{item.icon}</span>
              <span className="hidden sm:block whitespace-nowrap">{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
