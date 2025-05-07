"use client"
import { createContext, useState, useContext } from "react";
import { RoleContext } from "./RoleProvider";
import { useRouter } from "next/navigation";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [studentData, setStudentData] = useState(null);
  const [studentResult, setStudentResult] = useState(null);
  const [studentFeesPaymentDetails, setStudentFeesPaymentDetails] =
    useState(null);
  const [classDetails, setClassDetails] = useState(null);
  const [uploadUrl, setUploadUrl] = useState(null);
  var Role = useContext(RoleContext);
  const router = useRouter();

  // Async functions for various other operations
  async function StudentDetails() {
    let url = new URL(`http://43.204.234.139:3001/app/users/seeDetails`);
    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("firebaseToken"),
      },
    });
    response = await response.json();
    console.log(response)
    if (response.status !== 200) {

      alert("You are not authorized to view this page");
      router.push("/");
    }
    else {
      setStudentData(response.data);
    }
  }

  async function StudentLogin(userDetails) {
    let url = new URL("http://43.204.234.139:3001/app/users/login");
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("firebaseToken"),
      },
      body: JSON.stringify({
        userDetails: userDetails,
      }),
    });
    response = await response.json();

    console.log(response)
    if (response.status === 200) {

      try{Role.changeRole("student", userDetails.rollno, userDetails.email);}
      catch(error){
        console.log(error)
      }
      console.log("the roll number you have setted is" ,Role)
      router.push("/Details");
    } else {

      alert("You have entered invalid credentials");
    }
  }

  async function getStudentResult() {
    let url = new URL(`http://43.204.234.139:3001/app/users/getResult`);
    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("firebaseToken"),
      },
    });
    response = await response.json();
    console.log(response)
    if (response.status !== 200) {
      alert("You are not authorized to view this page");
      router.push("/");
    }
    else {
      setStudentResult(response.data);
    }
  }

  async function getStudentDetails() {
    let url = new URL(`http://43.204.234.139:3001/app/users/getDetails`);
    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("firebaseToken"),
      },
    });
    response = await response.json();
    setStudentFeesPaymentDetails(response.data);
  }
  async function getAssignmentUrl(filename) {
    try {
      const bucketName = "assignmentsolutions";

      const url = `http://43.204.234.139:3001/app/assignments/get-upload-url/${filename}/${bucketName}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("teacherFirebaseToken"),
        },
      });

      const data = await response.json();

      if (data.status === 200) {
        setUploadUrl(data.uploadUrl);
      } else {
        console.error("Error in response:", data);
      }
    } catch (error) {
      console.error("Error fetching upload URL:", error);
    }
  }
  async function getClassSchedule(classSection) {
    let url = new URL(`http://43.204.234.139:3001/app/users/getClassSchedule/${classSection}`);
    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("firebaseToken"),
      },
    });
    response = await response.json();
    if (response.status !== 200) {
      alert("You are not authorized to view this page");
      router.push("/");
    }
    else {
      setClassDetails(response.data);
    }
  }

  async function logout() {
    localStorage.removeItem("firebaseToken");
    Role.changeRole(null);
    router.push("/Student_Services");
  }

  return (
    <AuthContext.Provider
      value={{
        StudentLogin,
        studentData,
        StudentDetails,
        studentResult,
        getStudentDetails,
        studentFeesPaymentDetails,
        getStudentResult,
        logout,
        getAssignmentUrl,
        uploadUrl,
        setUploadUrl,
        getClassSchedule,
        classDetails
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
