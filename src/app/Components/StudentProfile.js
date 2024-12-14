"use client";
import React, { useContext, useState, useEffect } from "react";
import { FacultyContext } from "../Context/FacultyProvider";
import UpdateStudentResult from "./UpdateStudentResult";
import Chart from "./Chart";

export default function StudentProfile(props) {
  const context = useContext(FacultyContext);
  const [visibility, setVisibilty] = useState(false);
  const [profile, setProfile] = useState(null);

  return (
    <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <th
        scope="row"
        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {props.profile.rollno}
      </th>
      <td class="px-6 py-4">{props.profile.name}</td>
      <td class="px-6 py-4">{props.profile.section}</td>
      <td class="px-6 py-4">
        <a
          href="#"
          class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          onClick={() => {
            setVisibilty(true);
          }}
        >
          Edit
        </a>
        {visibility === true && (
          <UpdateStudentResult
            visibility={visibility}
            setVisibilty={setVisibilty}
            rollno={props.profile.rollno}
          />
        )}
      </td>
      <td class="px-6 py-4">
        <Chart />
      </td>
    </tr>
  );
}
