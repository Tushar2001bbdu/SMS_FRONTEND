"use client";

import { createContext, useState, useContext } from "react";
import { RoleContext } from "./RoleProvider";
import { useRouter } from "next/navigation";
import { toastBus } from "@/app/Components/Toast";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [studentData, setStudentData] = useState(null);
  const [studentResult, setStudentResult] = useState(null);
  const [studentFeesPaymentDetails, setStudentFeesPaymentDetails] = useState(null);
  const [classDetails, setClassDetails] = useState(null);
  const [uploadUrl, setUploadUrl] = useState(null);
  const Role = useContext(RoleContext);
  const router = useRouter();

  async function StudentDetails() {
    try {
      const response = await fetch("https://project-backend.online/app/users/seeDetails", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("firebaseToken"),
        },
      });
      const data = await response.json();
      if (data.status !== 200) {
        toastBus.show("Error fetching student details", "error");
        Role?.changeRole(null, -1, -1);
         localStorage.removeItem("firebaseToken")
        router.push("/")
      } else {
        setStudentData(data.data);
      }
    } catch (error) {
      console.error("Error:", error);
      toastBus.show("Something went wrong", "error");
    }
  }

  async function StudentLogin(userDetails) {
    try {
      const response = await fetch("https://project-backend.online/app/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("firebaseToken"),
        },
        body: JSON.stringify({ userDetails }),
      });

      const data = await response.json();
      console.log(userDetails)
      if (data.status === 200) {
        console.log(data)
        localStorage.setItem("rollno",userDetails.rollno)
        Role.changeRole("student", userDetails.rollno, userDetails.email);
        toastBus.show("Logged in successfully", "success");
        router.push("/Details");
      } else {
        Role?.changeRole(null, -1, -1);
        toastBus.show(data.message || "Login failed", "error");
        router.push("/")
        localStorage.removeItem("firebaseToken")
      }
    } catch (error) {
      console.error("Login error:", error);
      toastBus.show("Something went wrong during login", "error");
      router.push("/")
       localStorage.removeItem("firebaseToken")
    }
  }

  async function getStudentResult() {
    try {
      const response = await fetch("https://project-backend.online/app/users/getResult", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("firebaseToken"),
        },
      });

      const data = await response.json();
      if (data.status !== 200) {
        Role?.changeRole(null, -1, -1);
        toastBus.show("Failed to fetch result", "error");
        router.push("/")
         localStorage.removeItem("firebaseToken")
      } else {
        setStudentResult(data.data);
      }
    } catch (error) {
      console.error("Error fetching result:", error);
      Role?.changeRole(null, -1, -1);
       localStorage.removeItem("firebaseToken")
      toastBus.show("Something went wrong", "error");
    }
  }

  async function getStudentDetails() {
    try {
      const response = await fetch("https://project-backend.online/app/users/getDetails", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("firebaseToken"),
        },
      });

      const data = await response.json();
      setStudentFeesPaymentDetails(data.data);
    } catch (error) {
      console.error("Error fetching payment details:", error);
      toastBus.show("Failed to fetch fee details", "error");
        localStorage.removeItem("firebaseToken")
      router.push("/")
    }
  }

  async function getAssignmentUrl(filename) {
    try {
      const bucketName = "assignmentssolutions";
      const url = `https://project-backend.online/app/assignments/get-upload-url/${filename}/${bucketName}`;

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
        localStorage.removeItem("firebaseToken")
        toastBus.show(data.message || "Failed to get upload URL", "error");
      }
    } catch (error) {
      console.error("Error fetching upload URL:", error);
      toastBus.show("Something went wrong", "error");
      router.push("/")
      localStorage.removeItem("firebaseToken")
    }
  }

  async function getClassSchedule(classSection) {
    try {
      const url = `https://project-backend.online/app/users/getClassSchedule/${classSection}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("firebaseToken"),
        },
      });

      const data = await response.json();
      if (data.status !== 200) {
        Role?.changeRole(null, -1, -1);
        localStorage.removeItem("firebaseToken")
        toastBus.show("Failed to get class schedule", "error");
      } else {
        setClassDetails(data.data);
       
      }
    } catch (error) {
      console.error("Error fetching class schedule:", error);
      toastBus.show("Something went wrong", "error");
      router.push("/")
        localStorage.removeItem("firebaseToken")
    }
  }

  async function logout() {
    localStorage.removeItem("firebaseToken");
    Role.changeRole(null);
    toastBus.show("Logged out successfully", "success");
    router.push("/student");
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
        classDetails,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
