"use client";

import { createContext, useState, useContext, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { RoleContext } from "./RoleProvider";

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
  logout: () => void;
}

export const FacultyContext = createContext<FacultyContextType | null>(null);
export function FacultyProvider({ children }: { children: ReactNode }) {
  const [facultyData, setFacultyData] = useState<any>(null);
  const [studentList, setList] = useState<any>(null);
  const [studentProfile] = useState<any>(null);
  const Role = useContext(RoleContext);
  const router = useRouter();

  async function facultyLogin(facultyDetails: FacultyDetails): Promise<void> {
    try{
      let url = new URL("http://localhost:3001/app/teachers/login");
      url.searchParams.set("rollno", facultyDetails.rollNo);
  
      let response  = await fetch(url.toString(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("teacherFirebaseToken") || "",
        },
        body: JSON.stringify({
          userDetails: facultyDetails,
        }),
      });
      response=await response.json()
      if(response.status===200){
        localStorage.setItem("user", "teacher");

        Role?.changeRole("teacher",facultyDetails.rollNo,facultyDetails.email);
        router.push("/Details")
      }
      
      
    }
    catch(error){
      console.log(error)
    }
   
  }

  async function getFacultyProfile(): Promise<void> {
    const rollno = "221078897";
    let url = new URL(`http://localhost:3001/app/teachers/seeDetails`);
    url.searchParams.set("rollno", rollno);

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("teacherFirebaseToken") || "",
      },
    });

    const data = await response.json();
    setFacultyData(data.message);
  }

  async function getListOfStudents(section: string): Promise<void> {
    let url = new URL(`http://localhost:3001/app/teachers/listOfStudents`);
    url.searchParams.set("section", section);

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("teacherFirebaseToken") || "",
      },
    });

    const data = await response.json();
    setList(data.studentList);
  }

  async function getStudentProfile(rollno: string): Promise<any> {
    let url = new URL(`http://localhost:3001/app/teachers/getStudentProfile`);
    url.searchParams.set("rollno", rollno);

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("teacherFirebaseToken") || "",
      },
    });

    const data = await response.json();
    return data.profile;
  }

  async function updateResult(marks: string | number): Promise<void> {
    try{
      let url = new URL(`http://localhost:3001/app/teachers/updateResult`);

     let response= await fetch(url.toString(), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rollno: "121078899", marks: marks }),
      });
      if(response.status===200){
        router.push("/Details")
      }
    }
    catch(error){
      console.log(error)
    }
    
  }

  async function logout(): Promise<void> {
    localStorage.removeItem("teacherFirebaseToken");
    Role?.changeRole(null,"xxxxxxxxxxxxxxxx",'XXXXXX');
    router.push("/Faculty_Services");
  }

  return (
    <FacultyContext.Provider
      value={{
        facultyData,
        facultyLogin,
        getFacultyProfile,
        getListOfStudents,
        studentList,
        studentProfile,
        getStudentProfile,
        updateResult,
        logout,
      }}
    >
      {children}
    </FacultyContext.Provider>
  );
}
