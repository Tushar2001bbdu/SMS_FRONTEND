"use client";
import React, { useState, useEffect } from "react";
import { Outfit } from "next/font/google";
import "@/app/globals.css";
import { useDispatch, useSelector } from "react-redux";
import { getTeacherList, deleteTeacherRecord } from "@/app/redux/adminSlice";
import { AppDispatch } from "@/app/redux/adminStore";
import AddTeacher from "@/app/Components/AddTeacher";

const outfit = Outfit({ subsets: ["latin"], weight: ["500", "700"] });

const Page: React.FC = () => {
  const [addTeacher, setAddTeacher] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const teacherList = useSelector((state: any) => state.admin.teacherList);

  useEffect(() => {
    dispatch(getTeacherList());
  }, [dispatch]);

  if (teacherList?.length > 0) {
    return (
      <>
        {addTeacher && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 z-50">
            <AddTeacher setAddTeacher={setAddTeacher} />
          </div>
        )}

        <div className={`text-center mt-6 ${outfit.className} text-lg md:text-2xl lg:text-4xl`}>
          Teacher List
        </div>

        <div className="mt-6 w-screen px-4">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left">Photo</th>
                <th className="px-4 py-3 text-left">Roll Number</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Section</th>
                <th className="px-4 py-3 text-left">Subject</th>
                <th className="px-4 py-3 text-left">Edit</th>
                <th className="px-4 py-3 text-left">Suspend</th>
              </tr>
            </thead>
            <tbody>
              {teacherList.map((element: any, index: number) => (
                <tr
                  key={index}
                  className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900 dark:even:bg-gray-800 border-b dark:border-gray-700"
                >
                  <td className="px-4 py-3">
                    <img
                      src={element.profilepictureLink}
                      alt="teacher"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-4 py-3">{element.rollno}</td>
                  <td className="px-4 py-3">{element.name}</td>
                  <td className="px-4 py-3">{element.section}</td>
                  <td className="px-4 py-3">{element.subject}</td>
                  <td className="px-4 py-3 text-blue-600 hover:underline cursor-pointer">Edit</td>
                  <td
                    className="px-4 py-3 text-blue-600 hover:underline cursor-pointer"
                    onClick={() => dispatch(deleteTeacherRecord({ rollno: element.rollno }))}
                  >
                    Suspend
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div
            className="mx-auto mt-6 w-44 h-12 flex items-center justify-center text-white bg-green-700 rounded-lg cursor-pointer hover:bg-green-800"
            onClick={() => setAddTeacher(true)}
          >
            Add Teacher
          </div>
        </div>
      </>
    );
  }

  return <div className="text-center mt-10 text-gray-500">Loading...</div>;
};

export default Page;
