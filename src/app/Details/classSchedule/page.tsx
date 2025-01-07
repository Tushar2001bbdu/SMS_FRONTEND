"use client"
import React, { useEffect, useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";

interface StudentData {
  email: string;
  rollno: string;
  course: string;
  section: string;
  classteacher: string;
  teacherrollno: string;
}

interface StudentContext {
  studentData: StudentData | null;
  StudentDetails: () => Promise<any>;
  getClassSchedule: (value: string) => Promise<any>;
  classDetails: any;
}

const ClassesToday: React.FC = () => {
  const context = useContext<StudentContext | null>(AuthContext);
  const days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let daySchedule: any;

  useEffect(() => {
    if (context?.studentData == null) {
      context?.StudentDetails();
    }
    if (context?.classDetails == null && context?.studentData) {
      context?.getClassSchedule(context?.studentData.section);
    }
  }, [context]);

  if (context?.classDetails) {
    return (
      <div>
        <header className="animated-header text-dark text-center p-4">
          Your Room Number: UGF004
        </header>
        {days.map((day, index) => {
          daySchedule = context?.classDetails.schedule.filter((element: any) => {
            return day === element.day;
          });

          return (
            <div key={index} className="bg-gray-100 p-4 rounded shadow-md max-w-2xl mx-auto mt-6">
              <h2 className="text-lg font-semibold mb-3">📅 Classes On: {day}</h2>
              <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left">Subject</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Starts</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Ends</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Venue</th>
                  </tr>
                </thead>
                <tbody>
                  {daySchedule.map((element: any, index: number) => (
                    <tr key={index}>
                      <td className="border border-gray-300 px-4 py-2 w-1/2">{element.time.subject}</td>
                      <td className="border border-gray-300 px-4 py-2">{element.time.start}</td>
                      <td className="border border-gray-300 px-4 py-2">{element.time.end}</td>
                      <td className="border border-gray-300 px-4 py-2">{context?.classDetails.room}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    );
  }

  return null;
};

export default ClassesToday;
