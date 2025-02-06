"use client";
import React, { useState, useEffect } from "react";
import { Outfit } from 'next/font/google';
import '@/app/globals.css'
import { useDispatch, useSelector } from "react-redux";
import { getClassList,deleteStudentRecord } from "@/app/redux/adminSlice";
import { AppDispatch } from "@/app/redux/adminStore";
import AddStudent from "@/app/Components/AddStudent";

const outfit = Outfit({ subsets: ['latin'], weight: ['500', '700'] });
const Page: React.FC = () => {
  const [visibility, setVisibility] = useState("hidden");
  const [studentList, setStudentList] = useState([]);
  const [addStudent, setAddStudent] = useState<boolean>(false);
  const [editStudent, setEditStudent] = useState<boolean>(false);
  const [section,setSection]=useState<string>("");
  async function getStudentList(section: string) {
    await fetch(`http://localhost:3001/app/details/getStudentList/${section}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("adminFirebaseToken") || "",
      },
    })
      .then((response: any) => response.json())
      .then((data: any) => {
        setStudentList(data.data);
      });
  }
  const dispatch = useDispatch<AppDispatch>();
  let classList = useSelector((state: any) => state.admin.classList);
  let message = useSelector((state: any) => state.admin.message);
  useEffect(() => {
    dispatch(getClassList());
  }, [dispatch]);
  if (classList?.length > 0) {
    return (
      <>
      
      {addStudent===true && <div className="fixed inset-0 bg-gray-500 bg-opacity-75">{<AddStudent section={section} setAddStudent={setAddStudent} />}</div>}
        <div className={`text-center w-full ${outfit.className} text-lg md:text-2xl lg:text-4xl`}>Student List</div>
        <div className="flex justify-end mt-4">
          <button
            id="dropdownDefaultButton"
            className="text-white bg-blue-700 w-44 hover:bg-blue-800 focus:ring-4 focus:outline-none ..."
            onClick={() => {
              visibility === "hidden"
                ? setVisibility("visible")
                : setVisibility("hidden");
            }}
          >
            Select Section
            <svg
              className="w-1.5 h-1.5 ms-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          <div
            id="dropdown"
            className={`${visibility} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
          >
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
              {classList.map((element: any, index: number) => (
                <li key={index}>
                  <button
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => {getStudentList(element.code);setSection(element.code)}}
                  >
                    {element.code}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <table className="flex justify-center mt-4 divide-y divide-gray-200 dark:divide-gray-700">
            <tbody>
              {studentList.length > 0 &&
                studentList.map((element: any, index: number) => {
                  return (
                    <tr
                      key={index}
                      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <img
                          src={element.profilepictureLink}
                          alt="student"
                          width={50}
                          height={50}
                        />
                      </th>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {element.rollno}
                      </th>
                      <td className="px-6 py-4">{element.name}</td>
                      <td className="px-6 py-4">{element.section}</td>
                      <td className="px-6 py-4">
                        {element.teacherrollno[0].name}
                      </td>
                      <td className="px-6 py-4">
                        <a
                          href="#"
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          onClick={()=>{setEditStudent(true);}}
                        >
                          Edit
                        </a>
                      </td>
                      <td className="px-6 py-4">
                        <a
                          href="#"
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          onClick={()=>{dispatch(deleteStudentRecord({rollno:element.rollno,section:section}));if(message.length>0){alert(message)}}}
                        >
                          Suspend
                        </a>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          {studentList?.length>0 && <div className="mx-auto mt-4 h-19 text-center py-6 text-white bg-green-700 w-44 hover:bg-green-800 focus:ring-4 focus:outline-none ..." onClick={()=>{setAddStudent(true)}}>Add Student</div>}
        </div>
      </>
    );
  }
};

export default Page;
