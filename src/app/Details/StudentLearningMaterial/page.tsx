"use client";
import LearningMaterialBySection from "@/app/Components/LearningMaterialBySection";
import { FacultyContext } from "@/app/Context/FacultyProvider";
import React, { FC, useContext} from "react";
interface FacultyDetails {
  rollno: string;
  [key: string]: any;
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
  uploadUrl?: string  | null;
  getAssignmentUrl:(filename: string)=>Promise<any>;
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
 if(context?.facultyData==null){
    context?.getFacultyProfile()
 }
  
  return (
    <div>
      <header>
        <h1 style={headingStyle} className="flex w-full justify-center">STUDENT LEARNING MATERIAL</h1>
      </header>
      {context?.facultyData?.allotedSections?.map(
        (element: string, index: number) => (
          <div>
          <div className="section-name" style={headingStyle}>{element}</div>  
          <LearningMaterialBySection key={index} section={element}/>
          </div>
        )
      )}
    </div>
  );
};

export default StudentAssignments;
