"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "../redux/adminSlice";
import { AppDispatch } from "@/app/redux/adminStore";

const Page: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [menuOpen, setMenuOpen] = useState(true);

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
  
        setMenuOpen(false); // close mobile menu on click
      }}
      className="flex items-center w-full p-3 rounded-lg hover:bg-gray-100 cursor-pointer"
    >
      <div className="w-5 h-5 mr-4 bg-gray-300 rounded" />
      {label}
    </div>
  );

  return (
    <div className="w-full">
      {/* Mobile Hamburger Button */}
      <div className="p-4">
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="p-2 border rounded"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {/* Desktop Sidebar */}
      <div className="p-4 bg-white shadow-lg rounded-xl">
        <h5 className="text-xl font-semibold mb-4">Admin Corner</h5>
        <nav className="flex flex-col gap-1">
          <MenuItem label="Dashboard" route="/dashboard" />
          <MenuItem label="Personal Details" route="/personal-details" />
          <MenuItem label="Create Class" route="/admins/createClass" />
          <MenuItem label="Students" route="/admins/students" />
          <MenuItem label="Teachers" route="/admins/teachers" />
          <MenuItem label="Logout" onClick={() => dispatch(logout())} />
        </nav>
      </div>

      {/* Mobile Dropdown Menu */}
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
  );
};

export default Page;
