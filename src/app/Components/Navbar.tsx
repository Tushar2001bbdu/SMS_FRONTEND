import React, { useState, useRef, useContext } from "react";
import Webcam from "react-webcam";
import { useDispatch } from "react-redux";
import { sendPhoto } from "@/app/redux/adminSlice";
import { AppDispatch } from "@/app/redux/adminStore";
import { RoleContext } from "../Context/RoleProvider";

interface RoleContextType {
  role: string | null;
  changeRole: (newRole: any, rollno: any, email: any) => void;
  email: any;
  rollNumber: any;
}

const Page: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const webcamRef = useRef<Webcam | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [visibility, setVisibility] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const Role = useContext(RoleContext) as RoleContextType | null;

  const openWebcam = () => setVisibility(true);

  const captureImage = async() => {
    if (webcamRef.current) {
      const image = webcamRef.current.getScreenshot();
      if (image) {
        setImageSrc(image);
        await dispatch(sendPhoto(image));
      }
      setVisibility(false);
      setImageSrc(null);
    }
  };

  const isLoggedIn = Role?.role !== null;

  return (
    <div className="bg-gray-800 sticky top-0 z-50 shadow-md">
      {visibility && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-black rounded-lg p-2 shadow-lg z-50">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={400}
            height={300}
            className="rounded"
          />
        </div>
      )}

      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Mobile menu button */}
            <div className="flex sm:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-gray-400 hover:text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                aria-expanded={menuOpen}
                aria-label="Toggle navigation menu"
              >
                <svg
                  className={`h-6 w-6 ${menuOpen ? "hidden" : "block"}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg
                  className={`h-6 w-6 ${menuOpen ? "block" : "hidden"}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="hidden sm:flex sm:space-x-4 ml-6">
              {!isLoggedIn && (
                <>
                  <NavLink href="/student">Student</NavLink>
                  <NavLink href="/faculty">Faculty</NavLink>
                  <NavLink href="/administrator">Administrator</NavLink>
                </>
              )}
            </div>

            <div className="flex items-center space-x-3">
              {isLoggedIn && (
                <>
                  <ActionButton onClick={openWebcam} label="Open Webcam" />
                  <ActionButton onClick={captureImage} label="Capture Attendance" />
                </>
              )}
            </div>
          </div>
        </div>
        {menuOpen && !isLoggedIn && (
          <div className="sm:hidden px-2 pb-3 pt-2 space-y-1">
            <NavLink href="/student" mobile>
              Student
            </NavLink>
            <NavLink href="/faculty" mobile>
              Faculty
            </NavLink>
            <NavLink href="/administrator" mobile>
              Administrator
            </NavLink>
          </div>
        )}
      </nav>

      {/* Captured Image Preview */}
      {imageSrc && (
        <div className="p-4 bg-gray-900 text-white text-center">
          <p className="mb-2">Captured Image:</p>
          <img src={imageSrc} alt="Captured" className="mx-auto rounded max-w-xs" />
        </div>
      )}
    </div>
  );
};

const NavLink = ({
  href,
  children,
  mobile = false,
}: {
  href: string;
  children: React.ReactNode;
  mobile?: boolean;
}) => (
  <a
    href={href}
    className={`${
      mobile ? "block px-3 py-2 rounded-md" : "px-3 py-2"
    } text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white`}
  >
    {children}
  </a>
);

const ActionButton = ({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) => (
  <button
    onClick={onClick}
    className="rounded bg-gray-700 px-3 py-1 text-sm text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
  >
    {label}
  </button>
);

export default Page;
