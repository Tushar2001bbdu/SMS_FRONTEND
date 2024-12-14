import React, { useState, useRef, useContext } from "react";
import Webcam from "react-webcam";
import { AdminContext } from "../Context/AdminProvider";
import { RoleContext } from "../Context/RoleProvider";

export default function Navbar() {
  const [visibility, setVisibility] = useState(false);
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const context = useContext(AdminContext);
  const Role = useContext(RoleContext);

  // Function to open the webcam
  function openWebcam() {
    setVisibility(true);
  }


  const captureImage = async () => {
    const image = webcamRef.current.getScreenshot();
    if (image) {
      context.sendPhoto(image); // Send the blob to the context
    }
    setVisibility(false)
  };

  return (
    <div>
      {visibility && (
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg" // Changed to proper format
          width={400}
          height={300}
        />
      )}
      <nav className="bg-gray-800 relative">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            {/* Mobile menu button */}
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
                <svg
                  className="hidden h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Navbar content */}
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center text-white"></div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                 
                  
                  <a
                    href="/Student_Services"
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    hidden={Role.role!==null?true:false}
                  >
                    Student
                  </a>
                  
                 
                  <a
                    href="/Faculty_Services"
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    hidden={Role.role!==null?true:false}
                  >
                    Faculty
                  </a>
                  <a
                    href="#"
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    hidden={Role.role!==null?true:false}
                  >
                    Administrator
                  </a>
                </div>
              </div>
            </div>

            {/* User menu */}
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {Role.role!==null && <button
                type="button"
                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                onClick={openWebcam}
              >
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">Open user menu</span>
                Open Webcam
              </button> }
              {Role.role !== null && (
                <button
                  type="button"
                  className=" mx-3 relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  onClick={captureImage}
                >
                  {}
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">Capture Image</span>
                  Capture Attendance
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
      {/* Display captured image if exists */}
      {imageSrc && (
        <div style={{ marginTop: "10px" }}>
          <img
            src={imageSrc}
            alt="Captured"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      )}
    </div>
  );
}
