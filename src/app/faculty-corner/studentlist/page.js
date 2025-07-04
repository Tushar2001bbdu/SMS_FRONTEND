"use client";

import StudentProfile from "@/app/Components/StudentProfile";
import { FacultyContext } from "@/app/Context/FacultyProvider";
import React, { useContext, useEffect, useState, useCallback } from "react";

export default function Page() {
    const context = useContext(FacultyContext);

    if (!context) {
        console.error("FacultyContext is not provided");
        return null;
    }

    const [visibility, setVisibility] = useState(false);
    const [section, setSection] = useState(null);
    const [studentList, setStudentList] = useState([]);
    const [loading, setLoading] = useState(false);

   
    const getListOfStudent = useCallback(async (selectedSection) => {
        setLoading(true);
        try {
            const url = new URL("http://localhost:3001/app/teachers/listOfStudents");
            url.searchParams.set("section", selectedSection);

            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: localStorage.getItem("teacherFirebaseToken"),
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch student list");
            }

            const result = await response.json();
            setStudentList(result.data || []);
        } catch (error) {
            console.error("Error fetching student list:", error);
            setStudentList([]);
        } finally {
            setLoading(false);
        }
    }, []);  

  
    useEffect(() => {
        if (section) {
            getListOfStudent(section);
        }
    }, [section, getListOfStudent]);

    return (
        <div className="container mx-auto mt-4">
            <div className="flex flex-row flex-wrap w-full justify-between items-center gap-4">
                <div className="text-center w-full text-black">Student List</div>
                <div className="mb-4">
                    <button
                        id="dropdownDefaultButton"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none ..."
                        onClick={() => setVisibility(!visibility)}
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
                        className={`${visibility ? "block" : "hidden"
                            } w-full sm:w-auto bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
                    >
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 mb-3">
                            {["CCML-4", "CCML-3", "CCML-2", "CCML-1"].map(
                                (sec) => (
                                    <li key={sec}>
                                        <button
                                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                            onClick={() => {
                                                setSection(sec);
                                                setVisibility(false);
                                            }}
                                        >
                                            {sec}
                                        </button>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="mt-4">Loading...</div>
            ) : (
                <div
                    className={`relative ${section ? "block" : "hidden"
                        } w-full shadow-md sm:rounded-lg`}
                >
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    University Roll Number
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Section
                                </th>
                                <th scope="col" className="px-6 py-3">
                                   Profile Picture
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentList.length > 0 ? (
                                studentList.map((element, index) => (
                                    <StudentProfile
                                        key={index}
                                        profile={element}
                                    />
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="text-center py-4"
                                    >
                                        No students found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
