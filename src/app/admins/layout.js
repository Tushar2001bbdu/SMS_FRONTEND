"use client";
import { Inter } from "next/font/google";
import { useContext } from "react";
import { RoleContext } from "../Context/RoleProvider";
import dynamic from "next/dynamic";

const inter = Inter({ subsets: ["latin"] });



import AdminSidebar from "@/app/Components/AdminSideBar";

const Layout = ({ children }) => {
  const { role } = useContext(RoleContext) || {};

  if (!role) {
    return <div>Loading...</div>
  }

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-4 hidden md:block" role="navigation">
        <AdminSidebar/>
      </div>
      <div className="col-span-8" role="main">
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
