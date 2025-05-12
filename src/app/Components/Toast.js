"use client";
import { useState, useEffect } from "react";

// Declare toastBus outside of the component to make it accessible globally
export const toastBus = {
  show: (msg, type = "info") => {},
};

export default function Toast() {
  const [message, setMessage] = useState(null);
  const [type, setType] = useState("info");

  useEffect(() => {
   
    toastBus.show = (msg, type = "info") => {
      setMessage(msg);
      setType(type);
      setTimeout(() => setMessage(null), 15000);
      
    };
  }, []);

  if (!message) return null;

  // DaisyUI utility classes for different types of alerts (success, error, info)
  const alertStyles = {
    info: "alert-info",
    success: "alert-success",
    error: "alert-error",
    warning: "alert-warning",
  };

  return (
    <div
      className={`toast toast-top toast-end fixed z-50 p-4 rounded-md shadow-lg transition-opacity duration-300 opacity-100`}
      style={{ bottom: "20px", right: "20px" }} // Position toast at the bottom-right
    >
      <div className={`alert ${alertStyles[type]} animate-fade-in-out rounded-lg p-4 flex items-center space-x-4`}>
        <div className="flex-shrink-0">
          {/* Optionally, you can add icons for different types */}
          {type === "success" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
          {type === "error" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
          {type === "info" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01M12 5a7 7 0 11-7 7 7 7 0 017-7z"
              />
            </svg>
          )}
        </div>
        <div className="flex-1">
          <span>{message}</span>
        </div>
      </div>
    </div>
  );
}
