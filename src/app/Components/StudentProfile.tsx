"use client";
import React, { useState } from "react";
import Image from "next/image";
import UpdateStudentResult from "./UpdateStudentResult";

interface Profile {
  rollno: string;
  name: string;
  section: string;
  profilepictureLink:string;
}

interface StudentProfileProps {
  profile: Profile;
}

const Page: React.FC<StudentProfileProps> = ({ profile }) => {
  

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
        
       
        <img src={profile.profilepictureLink} alt={`${profile.name}'s profile picture`} width={50} height={50} />
      </td>
        
      
    </tr>
  );
};

export default Page;
