"use client";
import React, { useState, useEffect } from "react";
import { Outfit } from 'next/font/google';
import '@/app/globals.css'
import { useDispatch, useSelector } from "react-redux";
import { getClassList, deleteStudentRecord } from "@/app/redux/adminSlice";
import { AppDispatch } from "@/app/redux/adminStore";
import AddStudent from "@/app/Components/AddStudent";

const outfit = Outfit({ subsets: ['latin'], weight: ['500', '700'] });

const Page: React.FC = () => {
  const [visibility, setVisibility] = useState("hidden");
  const [studentList, setStudentList] = useState([]);
  const [addStudent, setAddStudent] = useState<boolean>(false);
  const [section, setSection] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();
  let classList = useSelector((state: any) => state.admin.classList);

  async function getStudentList(section: string) {
    const res = await fetch(`http://localhost:3001/app/details/getStudentList/${section}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("adminFirebaseToken") || "",
      },
    });
    const data = await res.json();
    setStudentList(data.data);
  }

  useEffect(() => {
    dispatch(getClassList());
  }, [dispatch]);

  if (classList?.length > 0) {
    return (
      <>
        {addStudent && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 z-50">
            <AddStudent section={section} setAddStudent={setAddStudent} />
          </div>
        )}

        <div className={`text-center w-full ${outfit.className} text-lg md:text-2xl lg:text-4xl mt-6`}>
          Student List
        </div>

        <div className="relative flex justify-end mt-6 pr-4">
          <button
            className="text-white bg-blue-700 w-44 hover:bg-blue-800 focus:ring-4 focus:outline-none px-4 py-2 rounded-lg"
            onClick={() => setVisibility(visibility === "hidden" ? "visible" : "hidden")}
          >
            Select Section
            <svg className="w-3 h-3 inline-block ml-2" viewBox="0 0 10 6" fill="none">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
            </svg>
          </button>

          <div
            className={`absolute top-12 right-4 z-10 ${visibility} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
          >
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
              {classList.map((element: any, index: number) => (
                <li key={index}>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => { getStudentList(element.code); setSection(element.code); setVisibility("hidden"); }}
                  >
                    {element.code}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 w-screen px-4">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm text-left">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3">Photo</th>
                <th className="px-4 py-3">Roll No</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Section</th>
                <th className="px-4 py-3">Teacher</th>
                <th className="px-4 py-3">Edit</th>
                <th className="px-4 py-3">Suspend</th>
              </tr>
            </thead>
            <tbody>
              {studentList.map((element: any, index: number) => (
                <tr
                  key={index}
                  className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900 dark:even:bg-gray-800 border-b dark:border-gray-700"
                >
                  <td className="px-4 py-3">
                    <img
                      src={element.profilepictureLink}
                      alt="student"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-4 py-3">{element.rollno}</td>
                  <td className="px-4 py-3">{element.name}</td>
                  <td className="px-4 py-3">{element.section}</td>
                  <td className="px-4 py-3">{element.teacherrollno[0]?.name}</td>
                  <td className="px-4 py-3 text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">
                    Edit
                  </td>
                  <td
                    className="px-4 py-3 text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                    onClick={() => {
                      dispatch(deleteStudentRecord({ rollno: element.rollno, section }));
                    }}
                  >
                    Suspend
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div
            className="mx-auto mt-6 h-12 flex items-center justify-center text-white bg-green-700 w-44 rounded-lg cursor-pointer hover:bg-green-800 focus:ring-4 focus:outline-none"
            onClick={() => setAddStudent(true)}
          >
            Add Student
          </div>
        </div>
      </>
    );
  }

  return <div className="text-center mt-10 text-gray-500">Loading...</div>;
};

export default Page;
