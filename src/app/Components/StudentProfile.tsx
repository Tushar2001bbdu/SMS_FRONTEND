"use client";
import React, { useState } from "react";
import UpdateStudentResult from "./UpdateStudentResult";
import Chart from "./Chart";

interface Profile {
  rollno: string;
  name: string;
  section: string;
}

interface StudentProfileProps {
  profile: Profile;
}

const StudentProfile: React.FC<StudentProfileProps> = ({ profile }) => {
  const [visibility, setVisibility] = useState(false);

  return (
    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {profile.rollno}
      </th>
      <td className="px-6 py-4">{profile.name}</td>
      <td className="px-6 py-4">{profile.section}</td>
      <td className="px-6 py-4">
        <a
          href="#"
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          onClick={() => {
            setVisibility(true);
          }}
        >
          Edit
        </a>
        {visibility && (
          <UpdateStudentResult
            setVisibility={visibility}
            visibility={setVisibility}
            rollno={profile.rollno}
          />
        )}
      </td>
      <td className="px-6 py-4">
        <Chart />
      </td>
    </tr>
  );
};

export default StudentProfile;
