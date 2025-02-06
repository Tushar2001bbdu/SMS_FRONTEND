"use client"
import React,{useContext} from "react";
import { RoleContext } from "../Context/RoleProvider";
import StudentsHomePage from "@/app/Components/StudentsHomePage"
interface RoleContextType {
    role: any;
    changeRole: (newRole: any,rollno:any,email:any) => void;
    email:any;
    rollNumber:any;
  
  }


const Page: React.FC = () => {
const role=useContext<RoleContextType | null>(RoleContext)

if(role?.role==="student"){
return(<StudentsHomePage/>)
}
  return (
    <div>
      <h1>It is my home page</h1>
      <p>it is good</p>
    </div>
  );
};


export default Page;
