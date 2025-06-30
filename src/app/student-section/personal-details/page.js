"use client";
import React, { useContext } from "react";

import FacultyProfile from "@/app/Components/FacultyProfile";
import StudentProfile from "@/app/Components/StudentProfilee";
import { RoleContext } from "@/app/Context/RoleProvider";
export default function Page() {
  const Role = useContext(RoleContext);
  return (
    <>
      {Role.role === "student" && <StudentProfile />}
      {Role.role === "faculty" && <FacultyProfile />}
    </>
  );
}
