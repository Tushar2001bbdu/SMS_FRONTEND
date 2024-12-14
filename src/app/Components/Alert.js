import React, { useState, useEffect } from 'react';

function Alert(props) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(false);
    }, 5000); // Adjust the timeout as needed

    return () => clearTimeout(timeoutId);
  }, [message]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className={`alert alert-warning ${isVisible ? 'visible' : 'hidden'} fixed top-0 left-0 right-0 p-4`} role="alert">
      <p className="text-white font-bold">{props.message}</p>
      <button type="button" className="close-button" onClick={handleClose}>
        &times;
      </button>
    </div>
  );
}

export default Alert;