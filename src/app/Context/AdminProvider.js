"use client"

import { createContext, useState, useContext } from 'react';
import Cookies from 'js-cookie'
import { RoleContext } from './RoleProvider';
export const AdminContext = createContext();


export function AdminProvider({ children }) {
  const [examNotification, setExamNotification] = useState(null)
  const role = useContext(RoleContext)
  async function sendPhoto(image) {
    let url = `http://localhost:3001/app/attendance/sendphoto`;
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

      }
      , body: JSON.stringify({
        "url": image,
        "rollno": role?.rollNumber
      })


    });



  }
  async function sendFrame(image) {
    let url = `http://localhost:3001/app/exam/sendphoto`;
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

      }
      , body: JSON.stringify({
        "url": image,
        "rollno": role?.rollNumber
      })


    });


    setExamNotification(response.message)
  }




  return (
    <AdminContext.Provider value={{ sendPhoto, sendFrame, examNotification }}>
      {children}
    </AdminContext.Provider>
  );
}
