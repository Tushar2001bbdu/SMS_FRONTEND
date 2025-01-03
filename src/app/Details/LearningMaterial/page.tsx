import { AuthContext } from '@/app/Context/AuthProvider'
import React, {useState, useContext,useEffect } from 'react'
import {getLearningMaterialBySection} from  "@/app/graphql/queries"
import { useQuery } from '@apollo/client';
import { RoleContext } from '@/app/Context/RoleProvider';
interface RoleContextType {
  role: any;
  changeRole: (newRole: any,rollno:any,email:any) => void;
  email:any;
  rollNumber:any;

}
interface StudentData {
    email: string;
    rollno: string;
    course: string;
    section: string;
    classteacher: string;
    teacherrollno: string;
  }
interface StudentContext{
    studentData:StudentData | null;
    StudentDetails:()=>Promise<any>;
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
export default function LearningMaterial(){
  const context=useContext<StudentContext | null>(AuthContext)
   const { data, loading, error } = useQuery<StudyMaterialList | null>(getLearningMaterialBySection, {
      variables: { section:context?.studentData?.section, uploadedBy:context?.studentData?.rollno  },
    });
  
    const [studyMaterial, setStudyMaterial] = useState<StudyMaterial[]>([]);
  
    useEffect(() => {
      if (data) {
        console.log(data)
        setStudyMaterial(data?.getLearningMaterialsBySection);
      }
    }, [data]);
    
    

};


