"use client";
import { Inter } from "next/font/google";
import { useContext } from "react";
import { RoleContext } from "../Context/RoleProvider";
import dynamic from "next/dynamic";

const inter = Inter({ subsets: ["latin"] });


const StudentSidebar = dynamic(() => import("../Components/StudentSideBar"));
const FacultySidebar = dynamic(() => import("../Components/FacultySideBar"));

const Layout = ({ children }) => {
  const { role } = useContext(RoleContext) || {};

  if (!role) {
    return <div>Loading...</div>
  }

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-4 hidden md:block" role="navigation">
        {role === "student" && <StudentSidebar />}
        {role === "teacher" && <FacultySidebar />}
        {!["student", "teacher"].includes(role) && <div>Invalid role</div>}
      </div>
      <div className="col-span-8" role="main">
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
