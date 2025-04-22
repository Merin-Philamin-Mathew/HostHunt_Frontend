import React from 'react';

// Reusable confirmation modal component
const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirmation",
  message = "Are you sure you want to proceed?",
  confirmButtonText = "Confirm",
  cancelButtonText = "Cancel",
  confirmButtonColor = "bg-blue-600 hover:bg-blue-700",
  cancelButtonColor = "bg-gray-500 hover:bg-gray-600"
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" 
        onClick={onClose}
      ></div>
      
      {/* Modal panel */}
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 z-10">
        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              {title}
            </h3>
            
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                {message}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse rounded-b-lg">
          <button
            type="button"
            className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm ${confirmButtonColor}`}
            onClick={onConfirm}
          >
            {confirmButtonText}
          </button>
          <button
            type="button"
            className={`mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 text-base font-medium text-gray-700 sm:mt-0 sm:w-auto sm:text-sm ${cancelButtonColor}`}
            onClick={onClose}
          >
            {cancelButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;