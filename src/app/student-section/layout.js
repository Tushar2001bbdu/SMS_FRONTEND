"use client";
import { Inter } from "next/font/google";
import { useContext } from "react";
import { RoleContext } from "../Context/RoleProvider";
import dynamic from "next/dynamic";

const inter = Inter({ subsets: ["latin"] });


const StudentSidebar = dynamic(() => import("@/app/Components/StudentSideBar"));
const FacultySidebar = dynamic(() => import("@/app/Components/FacultySideBar"));
const AdminSidebar = dynamic(() => import("@/app/Components/AdminSidebar"));

const Layout = ({ children }) => {
  const { role } = useContext(RoleContext) || {};

  if (!role) {
    return <div>Loading...</div>
  }

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-4 md:block" role="navigation">
        {role === "student" && <StudentSidebar />}
        {role === "faculty" && <FacultySidebar />}
        {!["student", "faculty"].includes(role) && <div>Invalid role</div>}
      </div>
      <div className="col-span-8" role="main">
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
