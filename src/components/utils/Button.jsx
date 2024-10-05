import React from 'react';

function Button({ icon=None, title, onClick, bg_color }) {
  return (
    <div>
      <button 
      onClick={onClick}
      className=" hover:bg-white  border-2  border-gray-800 text-gray-800 font-bold py-2 px-8 rounded-xl inline-flex items-center">
        {icon && <span className="mr-2">{icon}</span>}
        <span>{title}</span>
      </button>
    </div>
  );
}

export default Button;
