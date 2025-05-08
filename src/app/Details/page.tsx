"use client"
import React,{useContext,useEffect} from "react";
import { Roboto } from 'next/font/google'
import { RoleContext } from "../Context/RoleProvider";
import Chart from "../Components/Chart";
import { useRouter } from "next/router";
import { AuthContext } from "../Context/AuthProvider";
import Image from "next/image";
import StudentHomePage from '@/app/Components/StudentHome';
import TeacherHomePage from '@/app/Components/TeacherHome'
interface RoleContextType {
    role: any;
    changeRole: (newRole: any,rollno:any,email:any) => void;
    email:any;
    rollNumber:any;
  
  }
interface studentContextType{
    StudentDetails: () => Promise<any>;
    studentData: any;
    getStudentResult: () => Promise<any>;
    studentResult:any;
}
const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400', '700'],
  });

const Page: React.FC = () => {
  const Role = useContext(RoleContext) as RoleContextType | null;
if(Role?.role==="student"){
  return(<StudentHomePage/>)
}
else if(Role?.role==="faculty"){
  return(<TeacherHomePage/>)
}
else{
  return(
    <>
    Invalid User
    </>
  )
}
}

export default Page;
