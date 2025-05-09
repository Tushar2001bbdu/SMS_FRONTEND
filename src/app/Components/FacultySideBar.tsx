"use client";

import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { FacultyContext } from "@/app/Context/FacultyProvider"
interface FacultyContextType {
  facultyData: any;
  getFacultyProfile?: () => Promise<void>;
  studentProfile?: any;
  getStudentProfile?: (rollno: string) => Promise<any>;
  updateResult?: (rollno: string, marks: string | number) => Promise<void>;
  uploadUrl?: string  | null;
  getAssignmentUrl?:(filename: string)=>Promise<any>;
 
  logout?: () => void;
}
const FacultySidebar: React.FC = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const context=useContext(FacultyContext) as FacultyContextType | null;
  const menuItems = [
    { label: "Dashboard", path: "/FacultyDashboard" },
    { label: "Personal Details", path: "/Details/PersonalDetails" },
    { label: "Student List", path: "/Details/StudentList" },
    { label: "Start Online Class", path: "/Details/OnlineClasses" },
    { label: "Student Assignments", path: "/Details/StudentAssignments" },
    { label: "Student Learning Material", path: "/Details/StudentLearningMaterial" },
  ];

  return (
    <>
      {/* Hamburger menu (visible on mobile only) */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded shadow-md"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Sidebar"
      >
        <svg
          className="w-6 h-6 text-gray-800"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Sidebar - responsive and toggleable */}
      <div
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-white shadow-lg p-4 transform transition-transform duration-300 ease-in-out 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:block`}
      >
        <section className="p-4 mb-4 border-b border-gray-200">
          <h5 className="text-xl font-semibold text-gray-800">Faculty Corner</h5>
        </section>

        <nav className="flex flex-col gap-1 text-base text-gray-700">
          {menuItems.map(({ label, path }) => (
            <div
              key={path}
              role="button"
              onClick={() => {
                router.push(path);
                setIsOpen(false); // close sidebar on mobile
              }}
              className="flex items-center w-full p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition"
            >
              <span>{label}</span>
            </div>
          ))}
          <div
              role="button"
              onClick={() => {
                if(context?.logout){
                context?.logout()// close sidebar on mobile
              }}}
              className="flex items-center w-full p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition"
            >
              <span>Log Out</span>
            </div>
        </nav>
      </div>

      {/* Overlay on mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default FacultySidebar;
