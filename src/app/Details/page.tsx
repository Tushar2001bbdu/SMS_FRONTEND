"use client"
import React,{useContext,useEffect} from "react";
import { Roboto } from 'next/font/google'
import { RoleContext } from "../Context/RoleProvider";
import Chart from "../Components/Chart";
import { useRouter } from "next/router";
import { AuthContext } from "../Context/AuthProvider";
import Image from "next/image";
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


return(
  <>
  Page is Good
  </>
)
}

export default Page;
