"use client";
import AssignmentsBySection from "@/app/Components/AssignmentsBySection";
import { FacultyContext,FacultyContextType } from "@/app/Context/FacultyProvider";
import React, { FC, useContext} from "react";

const StudentAssignments: FC = () => {
  const headingStyle = {
    fontSize: "30px",
    fontWeight: 500,
    backgroundImage: "linear-gradient(to left, #553c9a, #b393d3)",
    color: "transparent",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
  };
  let context = useContext<FacultyContextType | null>(FacultyContext);
 if(context?.facultyData==null && context?.getFacultyProfile){
    context?.getFacultyProfile()
 }
  
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <header>
        <h1 style={headingStyle} className="text-center text-3xl sm:text-4xl md:text-5xl font-semibold px-2">STUDENT ASSIGNMENTS</h1>
      </header>
      {context?.facultyData?.allotedSections?.map(
        (element: string, index: number) => (
          <div key={index}>
          <section className="text-2xl font-bold mb-6 text-center text-gray-800">{element}</section>  
          <AssignmentsBySection key={index} section={element}/>
            </div>
        )
      )}
    </div>
  );
};

export default StudentAssignments;
