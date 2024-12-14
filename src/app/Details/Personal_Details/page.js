"use client";
import React, { useContext } from "react";

import FacultyProfile from "../../Components/FacultyProfile";
import StudentDetails from "../../Components/StudentDetails";
import { RoleContext } from "@/app/Context/RoleProvider";
export default function page() {
  const Role = useContext(RoleContext);
  return (
    <>
      {Role.role === "student" && <StudentDetails />}
      {Role.role === "teacher" && <FacultyProfile />}
    </>
  );
}
