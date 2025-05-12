import React, { useState, useEffect } from 'react';

function Alert(props) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(false);
    }, 60000); // The alert will auto-close after 60 seconds

    return () => clearTimeout(timeoutId);
  }, [props.message]);

  const handleClose = () => {
    setIsVisible(false);
    if (props.onClose) {
      props.onClose();
    }
  };

  return (
    <div 
      className={`fixed top-20% left-1/2 transform -translate-x-1/2 w-full max-w-lg p-6 bg-red-600 text-white rounded-lg shadow-xl ${isVisible ? 'opacity-100 animate-fadeIn' : 'opacity-0 animate-fadeOut'} transition-all duration-500`} 
      role="alert"
    >
      <div className="flex justify-between items-center">
        <p className="font-semibold text-xl">{props.message}</p>
        <button 
          type="button" 
          className="text-white font-bold bg-transparent hover:bg-white hover:text-red-600 rounded-full p-2 ml-4 transition-colors duration-300"
          onClick={handleClose}
        >
          ×
        </button>
      </div>
    </div>
  );
}

export default Alert;
