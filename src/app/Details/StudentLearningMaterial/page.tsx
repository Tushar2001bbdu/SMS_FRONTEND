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
  getFacultyProfile?: () => Promise<void>;

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
 if(context?.facultyData==null && context?.getFacultyProfile){
    context?.getFacultyProfile()
 }
  
  return (
    <div>
      <header>
        <h1 style={headingStyle} className="flex w-full justify-center">STUDENT LEARNING MATERIAL</h1>
      </header>
      {context?.facultyData?.allotedSections?.map(
        (element: string, index: number) => (
          <section key={index}>
          <section className="text-2xl font-bold mb-6 text-center text-gray-800">{element}</section>  
          <LearningMaterialBySection key={index} section={element}/>
          </section>
        )
      )}
    </div>
  );
};

export default StudentAssignments;
