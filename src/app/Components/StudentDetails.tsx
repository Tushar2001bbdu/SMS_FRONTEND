"use client";
import React, { useEffect, useContext } from 'react';
import { AuthContext } from '../Context/AuthProvider';
interface teacherData {
  name: string;
  rollno: string;
}
interface StudentData {
  email: string;
  rollno: string;
  course: string;
  section: string;
  classteacher: string;
  teacherrollno: teacherData[];
}


interface AuthContextType {
  studentData: StudentData | null;
  StudentDetails: () => void;
}

const Page: React.FC = () => {
  
  const con = useContext<AuthContextType | null>(AuthContext);

  useEffect(() => {
    if (con?.studentData === null) {
      con?.StudentDetails(); 
    }
  }, [con]);

  if (con !== null && con.studentData !== null) {
    return (
      <div>
        <section className="px-4 sm:px-0 text-center">
          <h1>Personal Details</h1>
        </section>
        <section className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Email Address</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{con.studentData.email}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">University Roll No</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{con.studentData.rollno}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Branch</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{con.studentData.course}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Section</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{con.studentData.section}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Name Of Class Teacher</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {con.studentData.classteacher}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Course</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {con.studentData.course}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Class Teacher Roll Number</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {con.studentData.teacherrollno[0].name}
              </dd>
            </div>
          </dl>
        </section>
      </div>
    );
  }

  return null; 
};

export default Page;
