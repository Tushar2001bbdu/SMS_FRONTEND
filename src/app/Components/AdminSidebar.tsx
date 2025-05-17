"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "../redux/adminSlice";
import { AppDispatch } from "@/app/redux/adminStore";

const Page: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [menuOpen, setMenuOpen] = useState(false);

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
        setMenuOpen(false); // Close menu on mobile tap
      }}
      className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:text-blue-gray-900 active:bg-blue-gray-50 active:text-blue-gray-900"
    >
      <div className="grid mr-4 place-items-center">
        {/* You can place an icon here */}
        <div className="w-5 h-5 bg-gray-300 rounded" />
      </div>
      {label}
    </div>
  );

  return (
    <>
      {/* Hamburger menu for mobile */}
      <div className="sm:hidden p-4">
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="p-2 border rounded"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {/* Sidebar container (mobile and desktop) */}
      <div className="relative flex flex-col p-4 text-gray-700 bg-white shadow-xl shadow-blue-gray-900/5 rounded-xl w-full sm:max-w-[20rem]">
        <div className="p-4 mb-2">
          <h5 className="text-xl font-semibold text-blue-gray-900">Admin Corner</h5>
        </div>

        {/* Desktop Sidebar */}
        <nav className="hidden sm:flex flex-col gap-1 p-2 text-base font-normal text-blue-gray-700">
          <MenuItem label="Dashboard" route="/dashboard" />
          <MenuItem label="Personal Details" route="/personal-details" />
          <MenuItem label="Create Class" route="/admins/createClass" />
          <MenuItem label="Students" route="/admins/students" />
          <MenuItem label="Teachers" route="/admins/teachers" />
          <MenuItem label="Logout" onClick={() => dispatch(logout())} />
        </nav>

        {/* Mobile Sidebar */}
       {menuOpen && (
  <div className="fixed top-16 left-0 right-0 z-50 bg-white p-4 shadow-md">
    <MenuItem label="Dashboard" route="/dashboard" />
    <MenuItem label="Personal Details" route="/personal-details" />
    <MenuItem label="Create Class" route="/admins/createClass" />
    <MenuItem label="Students" route="/admins/students" />
    <MenuItem label="Teachers" route="/admins/teachers" />
    <MenuItem label="Logout" onClick={() => dispatch(logout())} />
  </div>
)}

      </div>
    </>
  );
};

export default Page;
