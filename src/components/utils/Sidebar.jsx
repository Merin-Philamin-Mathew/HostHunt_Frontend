import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ items = [] }) => {
  return (
    <div className="space-y-3">
      <ul className="space-y-1">
        {items.map((item, index) => (
          <li key={index}>
            <Link
                to={item.link}
                className="flex items-center py-2 pl-2 md:pl-3  md:pr-7 hover:bg-gray-200 rounded-full transition"
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
