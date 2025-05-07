import React, { useContext, useEffect, useState } from "react";
import { getLearningMaterialBySection } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import { RoleContext } from "../Context/RoleProvider";
import Image from "next/image";
import AddLearningMaterialModal from "./AddLearningMaterialModal";
import FacultyStudyMaterialCard from "./FacultyStudyMaterialCard";

interface RoleContextType {
  role: any;
  changeRole: (newRole: any, rollno: string, email: string) => void;
  email: string;
  rollNumber: string;
}

interface Props {
  section: string;
}

interface StudyMaterial {
    title:string;
    description:string;
    subject:string;
    fileUrl:string;
    videoLink:string;
}

interface StudyMaterialList {
  getLearningMaterialsBySection: StudyMaterial[];
}

const Page: React.FC<Props> = ({ section }) => {
  const role = useContext<RoleContextType | null>(RoleContext);
  const [addStudyMaterial, setFunction] = useState<boolean>(false);
  const rollNumber = role?.rollNumber;

  const { data, loading, error } = useQuery<StudyMaterialList | null>(getLearningMaterialBySection, {
    variables: { section:section, uploadedBy: rollNumber },
  });

  const [studyMaterial, setStudyMaterial] = useState<StudyMaterial[]>([]);

  useEffect(() => {
    if (data) {
      console.log(data)
      setStudyMaterial(data?.getLearningMaterialsBySection);
    }
  }, [data]);

  if (addStudyMaterial) {
    return <AddLearningMaterialModal section={section} setIsOpen={setFunction}/>;
  }
 
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-4">Error: {error.message}</div>;
  }

  return (
    <div className="flex items-center justify-center px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {studyMaterial?.map((element: StudyMaterial,index:number) => (
          <FacultyStudyMaterialCard key={index} StudyMaterial={element} section={section} />
        ))}
        <div className="h-full w-full flex items-center justify-center">
          <Image alt="Assignment Card" src="/assignment.png" height={128} width={128} className="h-20 w-auto" />
          <button
            onClick={() => setFunction(true)}
            className="text-blue-500 hover:text-blue-700"
          >
            Add Study Content
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
