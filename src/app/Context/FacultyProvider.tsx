"use client";

import React,{ createContext, useState, useContext, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { RoleContext } from "./RoleProvider";

interface FacultyDetails {
  rollno: string;
  [key: string]: any;
}

interface FacultyContextType {
  facultyData: any;
  facultyLogin?: (facultyDetails: FacultyDetails) => Promise<void>;
  getFacultyProfile?: () => Promise<void>;
  studentProfile?: any;
  getStudentProfile?: (rollno: string) => Promise<any>;
  updateResult?: (rollno: string, marks: string | number) => Promise<void>;
  uploadUrl?: string  | null;
  getAssignmentUrl?:(filename: string)=>Promise<any>;
 
  logout?: () => void;
}

export const FacultyContext = createContext<FacultyContextType | null>(null);
export function FacultyProvider({ children }: { children: ReactNode }) {
  const [facultyData, setFacultyData] = useState<any>(null);
  const [studentList, setList] = useState<any>(null);
  const[uploadUrl,setUploadUrl]=useState<string | null>(null)
  const [studentProfile] = useState<any>(null);
  const Role = useContext(RoleContext);
  const router = useRouter();

  async function facultyLogin(facultyDetails: FacultyDetails): Promise<void> {
    try{
      let url = new URL("http://43.204.234.139:3001/app/teachers/login");
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
        Role?.changeRole("faculty",facultyDetails.rollNo,facultyDetails.email);
        router.push("/Details")
      }
      else{
        alert("You have entered invalid credentials")
      }
      
    }
    catch(error){
      alert("You have entered invalid credentials")
    }
   
  }

  async function getFacultyProfile(): Promise<void> {
    let url = new URL(`http://43.204.234.139:3001/app/teachers/seeDetails`)
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("teacherFirebaseToken") || "",
      },
    });

    const data = await response.json();
    if(data.status!==200){
      alert("Error in fetching the faculty profile")
    }
    else{
    setFacultyData(data.data);
    }
    
  }

async function getStudentProfile(rollno: string): Promise<any> {
    let url = new URL(`http://43.204.234.139:3001/app/teachers/getStudentProfile`);
    url.searchParams.set("rollno", rollno);

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("teacherFirebaseToken") || "",
      },
    });

    const data = await response.json();
    if(data.status!==200){
      alert("Error in fetching the student profile")
    }
    else{
    return data.profile;
    }
  }

  async function updateResult(marks: string | number): Promise<void> {
    try{
      let url = new URL(`http://43.204.234.139:3001/app/teachers/updateResult`);

     let response= await fetch(url.toString(), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rollno: "121078899", marks: marks }),
      });
      response=await response.json()
      if(response.status===200){
        router.push("/details")
      }
      else{
        alert("Error in updating the result")
      }

    }
    catch(error){
      console.log(error)
    }
    
  }
  async function getAssignmentUrl(filename: string) {
    try {
        const bucketName = "student-assignment-questions";

        const url = `http://43.204.234.139:3001/app/assignments/get-upload-url/${filename}/${bucketName}`;
        
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("teacherFirebaseToken") || ""
            }
        });

       

        const data = await response.json();

        if (data.status === 200) {
            setUploadUrl(data.uploadUrl);
        } else {
            alert("you want to upload file in invalid format try again");
        }
    } catch (error) {
        console.error("Error fetching upload URL:", error);
    }
}

  async function logout(): Promise<void> {
    localStorage.removeItem("teacherFirebaseToken");
    Role?.changeRole(null,"xxxxxxxxxxxxxxxx",'XXXXXX');
    router.push("/faculty");
  }

  return (
    <FacultyContext.Provider
      value={{
        facultyData,
        facultyLogin,
        getFacultyProfile,
        studentProfile,
        getStudentProfile,
        updateResult,
        logout,
        getAssignmentUrl,
        uploadUrl
      }}
    >
      {children}
    </FacultyContext.Provider>
  );
}
