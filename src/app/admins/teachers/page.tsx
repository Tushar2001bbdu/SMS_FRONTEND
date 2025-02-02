"use client";
import React, { useState, useEffect } from "react";
import { Outfit } from "next/font/google";
import "@/app/globals.css";
import { useDispatch, useSelector } from "react-redux";
import { getTeacherList } from "@/app/redux/adminSlice";
import { AppDispatch } from "@/app/redux/adminStore";
import AddTeacher from "@/app/Components/AddTeacher";
const outfit = Outfit({ subsets: ["latin"], weight: ["500", "700"] });
const Page: React.FC = () => {
  const [visibility, setVisibility] = useState("hidden");
  const [addTeacher, setAddTeacher] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const teacherList = useSelector((state: any) => state.admin.teacherList);
  useEffect(() => {
    dispatch(getTeacherList());
  }, [dispatch]);
  if (teacherList?.length > 0) {
    return (
      <>
        {addTeacher === true && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75">
            {<AddTeacher setAddTeacher={setAddTeacher} />}
          </div>
        )}

        <div
          className={`text-center w-full ${outfit.className} text-lg md:text-2xl lg:text-4xl`}
        >
          Teacher List
        </div>
        <div>
          <table className="flex justify-center mt-4 divide-y divide-gray-200 dark:divide-gray-700">
            <tbody>
              {teacherList.length > 0 &&
                teacherList.map((element: any, index: number) => {
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
                      <td className="px-6 py-4">{element.name}</td>
                      <td className="px-6 py-4">
                        <a
                          href="#"
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Edit
                        </a>
                      </td>
                      <td className="px-6 py-4">
                        <a
                          href="#"
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Suspend
                        </a>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div
            className="mx-auto mt-4 h-19 text-center py-6 text-white bg-green-700 w-44 hover:bg-green-800 focus:ring-4 focus:outline-none ..."
            onClick={() => {
              setAddTeacher(true);
            }}
          >
            Add Teacher
          </div>
        </div>
      </>
    );
  }
};

export default Page;
