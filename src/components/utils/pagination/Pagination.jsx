import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange, button='', off_button='', arrow='' }) {
  const selected_classname = button || 'bg-blue-600 text-white';
  const out_of_page_classname = off_button || 'bg-gray-700 text-gray-300'
  const page_turner = arrow||'text-gray-400 disabled:opacity-50'
  
  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
      <button
        className={page_turner}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronsLeft className="h-5 w-5" />
      </button>
      
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          className={`px-3 py-1 rounded ${
            currentPage === i + 1 ? selected_classname : out_of_page_classname
          }`}
          onClick={() => onPageChange(i + 1)}
        >
          {i + 1}
        </button>
      ))}
      
      <button
        className={page_turner}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronsRight className="h-5 w-5" />
      </button>
    </div>
  );
}

export default Pagination;
