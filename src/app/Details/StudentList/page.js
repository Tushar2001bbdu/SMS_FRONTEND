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

    // useCallback should be defined outside of conditionals
    const getListOfStudent = useCallback(async (selectedSection) => {
        setLoading(true);
        try {
            const url = new URL("http://43.204.234.139:3001/app/teachers/listOfStudents");
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
    }, []);  // Empty dependency array means this won't change during re-renders

    // useEffect will now always run when `section` changes
    useEffect(() => {
        if (section) {
            getListOfStudent(section);
        }
    }, [section, getListOfStudent]); // Removed context from dependency, it's not used directly

    return (
        <div className="text-center mt-4 mr-4">
            <div className="flex flex-row w-full justify-between">
                <div className="text-center w-full text-black">Student List</div>
                <div>
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
                            } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
                    >
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
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
                        } overflow-x-auto shadow-md sm:rounded-lg`}
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
