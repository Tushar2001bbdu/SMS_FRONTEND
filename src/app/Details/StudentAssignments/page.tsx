"use client";
import { FacultyContext } from "@/app/Context/FacultyProvider";
import React, { FC, useContext, useEffect } from "react";
interface FacultyDetails {
  rollno: string;
  [key: string]: any;
  allotedSections?: string[];
}

interface FacultyContextType {
  facultyData: any;
  facultyLogin: (facultyDetails: FacultyDetails) => Promise<void>;
  getFacultyProfile: () => Promise<void>;
  getListOfStudents: (section: string) => Promise<void>;
  studentList: any;
  studentProfile: any;
  getStudentProfile: (rollno: string) => Promise<any>;
  updateResult: (rollno: string, marks: string | number) => Promise<void>;
  logout: () => void;
}
const StudentAssignments: FC = () => {
  const headingStyle = {
    fontSize: "40px",
    fontWeight: 600,
    backgroundImage: "linear-gradient(to left, #553c9a, #b393d3)",
    color: "transparent",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
  };
  let context = useContext<FacultyContextType | null>(FacultyContext);
  useEffect(() => {
    if (context) {
      context.getFacultyProfile();
    }
  }, []);
  return (
    <div>
      <header>
        <h1 style={headingStyle} className="flex w-full justify-center">STUDENT ASSIGNMENTS</h1>
      </header>
      {context?.facultyData.allotedSections?.map(
        (element: string, index: number) => (
          <div key={index} style={headingStyle}>{element}</div>
        )
      )}
    </div>
  );
};

export default StudentAssignments;
