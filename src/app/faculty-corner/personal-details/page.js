"use client";
import React, { useContext } from "react";

import FacultyProfile from "../../Components/FacultyProfile";
import StudentDetails from "../../Components/StudentProfilee";
import { RoleContext } from "@/app/Context/RoleProvider";
export default function Page() {
  const Role = useContext(RoleContext);
  return (
    <>
      {Role.role === "student" && <StudentDetails />}
      {Role.role === "faculty" && <FacultyProfile />}
    </>
  );
}
