"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { RoleContext } from "./RoleProvider";
import { toastBus } from "@/app/Components/Toast";

export interface FacultyDetails {
  rollno: string;
  email?: string;
  [key: string]: any;
}

export interface FacultyContextType {
  facultyData: any;
  facultyLogin: (facultyDetails: FacultyDetails) => Promise<void>;
  getFacultyProfile: () => Promise<void>;
  studentProfile: any;
  getStudentProfile: (rollno: string) => Promise<any>;
  updateResult: (rollno: string, marks: string | number) => Promise<void>;
  getAssignmentUrl: (filename: string) => Promise<void>;
  uploadUrl: string | null;
  logout: () => void;
}

export const FacultyContext = createContext<FacultyContextType | null>(null);

export function FacultyProvider({ children }: { children: ReactNode }) {
  const [facultyData, setFacultyData] = useState<any>(null);
  const [uploadUrl, setUploadUrl] = useState<string | null>(null);
  const [studentProfile] = useState<any>(null);
  const Role = useContext(RoleContext);
  const router = useRouter();

  async function facultyLogin(facultyDetails: FacultyDetails): Promise<void> {
    try {
      const url = new URL("http://localhost:3001/app/teachers/login");
      url.searchParams.set("rollno", facultyDetails.rollNo);

      let response = await fetch(url.toString(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("teacherFirebaseToken") || "",
        },
        body: JSON.stringify({ userDetails: facultyDetails }),
      });

      response = await response.json();
      if (response.status === 200) {
        Role?.changeRole("faculty", facultyDetails.rollNo, facultyDetails.email || "");
        toastBus.show("Logged in successfully", "success");
        router.push("/faculty-section");
      } else {
        Role?.changeRole(null, -1, -1);
        toastBus.show("Invalid credentials", "error");
        localStorage.removeItem("teacherFirebaseToken")
      }
    } catch (error) {
      toastBus.show("An error occurred while logging in", "error");
      console.error(error);
      localStorage.removeItem("teacherFirebaseToken")
    }
  }

  async function getFacultyProfile(): Promise<void> {
    try {
      const url = new URL(`http://localhost:3001/app/teachers/seeDetails`);
      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("teacherFirebaseToken") || "",
        },
      });

      const data = await response.json();
      if (data.status === 200) {
        setFacultyData(data.data);
      } else {
        Role?.changeRole(null, -1, -1);
        toastBus.show("Failed to fetch faculty profile", "error");
        localStorage.removeItem("teacherFirebaseToken")
      }
    } catch (error) {
      console.error(error);
      toastBus.show("An error occurred while fetching faculty profile", "error");
      localStorage.removeItem("teacherFirebaseToken")
    }
  }

  async function getStudentProfile(rollno: string): Promise<any> {
    try {
      const url = new URL(`http://localhost:3001/app/teachers/getStudentProfile`);
      url.searchParams.set("rollno", rollno);

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("teacherFirebaseToken") || "",
        },
      });

      const data = await response.json();
      if (data.status === 200) {
        return data.profile;
      } else {
        Role?.changeRole(null, -1, -1);
        toastBus.show("Failed to fetch student profile", "error");
        localStorage.removeItem("teacherFirebaseToken")
        return null;
      }
    } catch (error) {
      toastBus.show("An error occurred while fetching student profile", "error");
      console.error(error);
      localStorage.removeItem("teacherFirebaseToken")
      return null;
    }
  }

  async function updateResult(rollno: string, marks: string | number): Promise<void> {
    try {
      const url = new URL(`http://localhost:3001/app/teachers/updateResult`);
      let response = await fetch(url.toString(), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rollno:rollno, marks:marks }),
      });

      response = await response.json();
      if (response.status === 200) {
        toastBus.show("Result updated successfully", "success");
      } else {
        localStorage.removeItem("teacherFirebaseToken")
        console.log(response);
        toastBus.show("Error in updating the result", "error");
      }
    } catch (error) {
      localStorage.removeItem("teacherFirebaseToken")
      toastBus.show("An error occurred while updating the result", "error");
      console.log(error);
    }
  }

  async function getAssignmentUrl(filename: string): Promise<void> {
    try {
      const bucketName = "assignmentsquestions";
      const url = `http://localhost:3001/app/assignments/get-upload-url/${filename}/${bucketName}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("teacherFirebaseToken") || "",
        },
      });

      const data = await response.json();
      if (data.status === 200) {
        setUploadUrl(data.uploadUrl);
      } else {
        localStorage.removeItem("teacherFirebaseToken")
        toastBus.show("Invalid file format or upload error", "error");
      }
    } catch (error) {
      localStorage.removeItem("teacherFirebaseToken")
      toastBus.show("An error occurred while getting upload URL", "error");
      console.error("Error fetching upload URL:", error);
    }
  }

  async function logout(): Promise<void> {
    localStorage.removeItem("teacherFirebaseToken");
    Role?.changeRole(null, -1, -1);
    toastBus.show("Logged out successfully", "success");
    router.push("/faculty");
    localStorage.removeItem("teacherFirebaseToken")
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
        getAssignmentUrl,
        uploadUrl,
        logout,
      }}
    >
      {children}
    </FacultyContext.Provider>
  );
}
