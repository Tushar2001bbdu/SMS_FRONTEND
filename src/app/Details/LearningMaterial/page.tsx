"use client";
import { AuthContext } from "@/app/Context/AuthProvider";
import React, { useState, useContext, useEffect } from "react";
import { getLearningMaterialBySection } from "@/app/graphql/queries";
import { useQuery } from "@apollo/client";
import FacultyStudyMaterialCard from "@/app/Components/FacultyStudyMaterialCard";

interface StudentData {
  email: string;
  rollno: string;
  course: string;
  section: string;
  classteacher: string;
  teacherrollno: string;
}
interface StudentContext {
  studentData: StudentData | null;
  StudentDetails: () => Promise<any>;
}
interface StudyMaterial {
  title: string;
  description: string;
  subject: string;
  fileUrl: string;
  videoLink: string;
}

interface StudyMaterialList {
  getLearningMaterialsBySection: StudyMaterial[];
}

export default function LearningMaterial() {
  const context = useContext<StudentContext | null>(AuthContext);
  const { data, loading, error } = useQuery<StudyMaterialList | null>(
    getLearningMaterialBySection,
    {
      variables: {
        section: context?.studentData?.section,
        uploadedBy: context?.studentData?.teacherrollno,
      },
    }
  );

  const [studyMaterial, setStudyMaterial] = useState<StudyMaterial[]>([]);

  useEffect(() => {
    if (data) {
      setStudyMaterial(data?.getLearningMaterialsBySection);
    }
  }, [data]);

  if (context?.studentData === null) {
    context.StudentDetails();
  }

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-4">Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center mt-6 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Learning Materials
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {studyMaterial?.map((element, index) => {
          return (
            <FacultyStudyMaterialCard
              key={index}
              StudyMaterial={element}
              section={context?.studentData?.section || ""}
            />
          );
        })}
      </div>
    </div>
  );
}
