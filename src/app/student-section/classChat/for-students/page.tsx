"use client";

import React, { useContext, useEffect, useState } from "react";
import { StudentContext } from "@/app/Context/StudentProvider";
import GroupChatApp from "@/app/Components/GroupChatApp";

interface teacherData {
  name: string;
  rollno: string;
}

interface StudentData {
  name: string;
  email: string;
  rollno: string;
  course: string;
  section: string;
  classteacher: string;
  teacherrollno: teacherData[];
}

interface StudentContextType {
  studentData: StudentData | null;
  StudentDetails: () => Promise<any>;
}

const Page: React.FC = () => {
  const context = useContext<StudentContextType | null>(StudentContext);
  const receiverId: string = context?.studentData?.section || "";
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (context?.studentData === null) {
      context.StudentDetails();
    }
  }, [context]);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-white border-r shadow-md z-40 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Mobile header in sidebar */}
        <div className="flex justify-between items-center px-4 py-3 border-b md:hidden">
          <h2 className="text-lg font-semibold text-gray-800">Class Groups</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => setSidebarOpen(false)}
          >
            ✕
          </button>
        </div>

        {/* Sidebar content */}
        <div className="p-6 space-y-4 text-center">
          <h3 className="text-lg font-medium text-gray-700">Group:</h3>
          <div className="text-xl font-bold text-blue-600">{receiverId}</div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-64 p-4 overflow-y-auto">
        {/* Mobile Toggle Button */}
        <div className="md:hidden mb-4">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700"
            onClick={() => setSidebarOpen(true)}
          >
            Open Sidebar
          </button>
        </div>

        {/* Chat Section */}
        {receiverId.length > 0 ? (
          <section className="bg-white rounded-xl shadow p-4 h-full flex flex-col">
            <GroupChatApp
              senderName={context?.studentData?.name || ""}
              senderRollNo={context?.studentData?.rollno || ""}
              groupName={receiverId}
            />
          </section>
        ) : (
          <div className="text-center text-gray-500 mt-20 text-lg">
            Loading group info...
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
