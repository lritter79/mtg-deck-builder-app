import React from 'react';

interface ToastProps {
  message: string;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded shadow-md flex items-center">
      <p className="text-gray-800 mr-4">{message}</p>
      <button onClick={onClose} className="ml-2">
        <p className="w-4 h-4 text-gray-500 hover:text-gray-700 cursor-pointer">
          X
        </p>
      </button>
    </div>
  );
};

export default Toast;
