"use client";

import { createContext, useState, useContext } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { RoleContext } from "./RoleProvider";

export const FacultyContext = createContext();

export function FacultyProvider({ children }) {
  const [facultyData, setFacultyData] = useState(null);
  const [studentList, setList] = useState(null);
  const [studentProfile] = useState(null);
  const Role = useContext(RoleContext);
  const router = useRouter();
  async function facultyLogin(facultyDetails) {
    let url = new URL("http://localhost:3001/app/teachers/login");
    url.searchParams.set("rollno", facultyDetails.rollNo);
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("teacherFirebaseToken"),
      },
      body: JSON.stringify({
        userDetails: facultyDetails
      }),
    });
    localStorage.setItem("user", "teacher");
    if (response.status == 200) {
      Role.changeRole("teacher");

      Cookies.set('rollno', facultyDetails.rollno, {
        expires: 7,
        path: '',

        sameSite: 'Strict'
      });
    }

    localStorage.setItem("user", "teacher");

  }
  async function getFacultyProfile() {
    let rollno = "221078897";
    let url = new URL(`http://localhost:3001/app/teachers/seeDetails`);

    url.searchParams.set("rollno", rollno);
    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("teacherFirebaseToken"),
      },
    });

    response = await response.json();
    setFacultyData(response.message);
  }
  async function getListOfStudents(section) {
    let url = new URL(`http://localhost:3001/app/teachers/listOfStudents`);
    url.searchParams.set("section", section);
    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("teacherFirebaseToken"),
      },
    });
    console.log("The RESPONSE is: " + response);
    setList(response.studentList);
  }
  async function getStudentProfile(rollno) {
    let url = new URL(`http://localhost:3001/app/teachers/getStudentProfile`);
    url.searchParams.set("rollno", rollno);
    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("teacherFirebaseToken"),
      },
    });

    response = await response.json();
    return response.profile;
  }
  async function updateResult(rollno, marks) {
    let url = new URL(`http://localhost:3001/app/teachers/updateResult`);
    url.searchParams.set("rollno", rollno);
    url.searchParams.set("marks", marks);
    await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("teacherFirebaseToken"),
      },
      body: JSON.stringify({
        rollno: rollno,
        marks: marks,
      }),
    });
  }
  async function logout() {
    localStorage.removeItem("teacherFirebaseToken");
    Role.changeRole(null);
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
