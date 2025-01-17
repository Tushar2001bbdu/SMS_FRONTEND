"use client";

import { createContext, useState, useContext } from "react";
import Cookies from "js-cookie";

import { RoleContext } from "./RoleProvider";
export const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [examNotification, setExamNotification] = useState(null);
  const role = useContext(RoleContext);
  async function sendPhoto(image) {
    let url = `http://localhost:3001/app/attendance/sendphoto`;
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: image,
        rollno: role?.rollNumber,
      }),
    });
  }
  async function sendFrame(image) {
    try {
      let url = `http://localhost:3001/app/exam/sendphoto`;
      let response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: image,
          rollno: role?.rollNumber,
        }),
      });

      response = await response.json();
      setExamNotification(response.message);
    } catch (error) {
      console.log(error);
    }
  }

  async function MarkAssignment(s3Link, fileType, subject) {
    let url = new URL(
      `http://localhost:3001/app/assignments/markAssignment/${role.rollNumber}`
    );
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("firebaseToken"),
      },
      body: JSON.stringify({
        s3Link: s3Link,
        fileType: fileType,
        subject: subject,
      }),
    });
  }

  return (
    <AdminContext.Provider
      value={{ sendPhoto, sendFrame, examNotification, MarkAssignment }}
    >
      {children}
    </AdminContext.Provider>
  );
}
