"use client";
import React, { useState,useContext } from "react";
import { useRouter } from "next/navigation";
import { logout } from "../redux/adminSlice";
import { AppDispatch } from "@/app/redux/adminStore";
import { StudentContext } from "../Context/StudentProvider";
interface StudentContext
{
  logout: () => void;
}
const Page: React.FC = () => {
  const router = useRouter();
  const context=useContext(StudentContext) as StudentContext | null;
  const [menuOpen, setMenuOpen] = useState(false);
  const mainRoute ="student-corner"

  const MenuItem = ({
    label,
    route,
    onClick,
  }: {
    label: string;
    route?: string;
    onClick?: () => void;
  }) => (
    <div
      role="button"
      onClick={() => {
        if (onClick) onClick();
        else if (route) router.push(route);
        setMenuOpen(false);
      }}
      className="flex items-center w-full p-3 rounded-lg hover:bg-gray-100 cursor-pointer"
    >
      <div className="w-5 h-5 mr-4 bg-gray-300 rounded" />
      {label}
    </div>
  );

  return (
    <div className="w-full z-50">
     
      <div className="p-4 sm:hidden w-full items-center">
  <button
    onClick={() => {
    
      setMenuOpen((prev) => !prev);
    }}
    className="flex z-50 bg-blue-500 p-2 border rounded flex flex-col space-y-1"
  >
    <span className="w-6 h-0.5 bg-black"></span>
    <span className="w-6 h-0.5 bg-black"></span>
    <span className="w-6 h-0.5 bg-black"></span>
  </button>
</div>

      <div className="p-4 hidden sm:block bg-white shadow-lg rounded-xl">
        <h5 className="text-xl font-semibold mb-4">Student Corner</h5>
        <nav className="flex flex-col gap-1">
          <MenuItem label="Dashboard" route={mainRoute} />
          <MenuItem label="Personal Details" route={`/${mainRoute}/personal-details`} />
          <MenuItem label="Class Schedule" route= {`/${mainRoute}/classSchedule` } />
          <MenuItem label="Class Chat" route= {`/${mainRoute}/classChat/for-students`} />
          <MenuItem label="Contact Teachers" route={ `/${mainRoute}/contact/student`} />
          <MenuItem label="Attend Online Class" route= { `/${mainRoute}/onlineClasses`} />
          <MenuItem label="Give Online Exam" route= { `/${mainRoute}/exam/startExam`} />
          <MenuItem label="See Assignments" route= { `/${mainRoute}/assignments`} />
          <MenuItem label="Learning Material" route= { `${mainRoute}/studentLearningMaterial `}/>
          <MenuItem label="Class Schedule" route= { `${mainRoute}/classSchedule`} />

          <MenuItem label="Logout" onClick={() => context?.logout()} />
        </nav>
      </div>

     
      {menuOpen && (
        <div className="top-16 sm:hidden left-0 right-0 z-50 bg-white p-4 shadow-md">
        <MenuItem label="Dashboard" route="/Details" />
          <MenuItem label="Personal Details" route="/Details/PersonalDetails" />
          
          <MenuItem label="Class Chat" route="/Details/ClassChat/Students" />
          <MenuItem label="Contact Teachers" route="/Details/Contact/Student" />
          <MenuItem label="Attend Online Class" route="/Details/OnlineClasses" />
          <MenuItem label="Give Online Exam" route="/Details/Exam/StartExam" />
          <MenuItem label="See Assignments" route="/Details/Assignments" />
          <MenuItem label="Learning Material" route="/Details/LearningMaterial" />
          <MenuItem label="Class Schedule" route="/Details/ClassSchedule" />

          <MenuItem label="Logout" onClick={() => context?.logout()} />
        </div>
      )}
    </div>
  );
};

export default Page;
