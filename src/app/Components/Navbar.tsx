import React, { useState, useRef, useContext } from "react";
import Webcam from "react-webcam";
import { useDispatch } from "react-redux";
import { sendPhoto } from "@/app/redux/adminSlice";
import { AppDispatch } from "@/app/redux/adminStore"; 
import { RoleContext } from "../Context/RoleProvider";

interface RoleContextType {
  role: any;
  changeRole: (newRole: any, rollno: any, email: any) => void;
  email: any;
  rollNumber: any;
}

const Navbar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const webcamRef = useRef<Webcam | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [visibility, setVisibility] = useState<boolean>(false);

  const Role = useContext(RoleContext) as RoleContextType | null;

  function openWebcam() {
    setVisibility(true);
  }

  const captureImage = async () => {
    if (webcamRef.current) {
      const image = webcamRef.current.getScreenshot();
      if (image) {
        setImageSrc(image); 
        dispatch(sendPhoto(image));
      }
      setVisibility(false);
    }
  };

  return (
    <>
      <div className="fixed h-16 top-0 left-0 right-0 bg-gray-800 z-50">
        <nav className="bg-gray-800">
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center text-white"></div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    <a href=".login/student" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white" hidden={Role?.role !== null}>
                      Student
                    </a>
                    <a href="/login/faculty" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white" hidden={Role?.role !== null}>
                      Faculty
                    </a>
                    <a href="/login/administrator" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white" hidden={Role?.role !== null}>
                      Administrator
                    </a>
                  </div>
                </div>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {Role?.role !== null && (
                  <button
                    type="button"
                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    onClick={openWebcam}
                  >
                    <span className="sr-only">Open user menu</span>
                    Open Webcam
                  </button>
                )}
                {Role?.role !== null && (
                  <button
                    type="button"
                    className="mx-3 relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    onClick={captureImage}
                  >
                    <span className="sr-only">Capture Image</span>
                    Capture Attendance
                  </button>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
      {visibility && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={400}
              height={300}
              className="rounded-lg"
            />
            <div className="flex justify-center mt-4">
              <button onClick={captureImage} className="bg-blue-600 text-white px-4 py-2 rounded-lg mx-2">
                Capture
              </button>
              <button onClick={() => setVisibility(false)} className="bg-red-600 text-white px-4 py-2 rounded-lg mx-2">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {imageSrc && (
        <div className="mt-4 flex justify-center">
          <img src={imageSrc} alt="Captured" className="max-w-xs rounded-lg shadow-lg" />
        </div>
      )}
    </>
  );
};

export default Navbar;
