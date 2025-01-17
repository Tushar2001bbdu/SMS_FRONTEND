import React, { useState, useEffect } from 'react';

function Alert(props) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(false);
    }, 60000);

    return () => clearTimeout(timeoutId);
  }, [props.message]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      onClose();
    }
  };

  return (
    <div 
      className={`alert alert-warning ${isVisible ? 'visible border-4 border-red-500 animate-border' : 'hidden'} fixed top-20% left-1/2  p-4`} 
      role="alert"
    >
      <p className="text-black font-bold">{props.message}</p>
      <button type="button" className="close-button" onClick={handleClose}>
        Close Modal
      </button>
    </div>
  );
}

export default Alert;