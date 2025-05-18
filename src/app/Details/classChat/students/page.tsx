"use client";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/app/Context/AuthProvider";
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
  const context = useContext<StudentContextType | null>(AuthContext);
  const receiverId: string = context?.studentData?.section || "";
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (context?.studentData === null) {
      context.StudentDetails();
    }
  }, [context]);

  return (
    <div className="flex flex-col md:flex-row  overflow-hidden">
      

{/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 z-40 bg-gray-800 text-white p-4 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:w-1/3 md:block`}
      >
        {/* Mobile close button */}
        <div className="flex justify-between items-center mb-6 md:hidden">
          <h2 className="text-2xl font-bold">Class Groups</h2>
          <button onClick={() => setSidebarOpen(false)}>✕</button>
        </div>

        <div className="space-y-4 sticky text-center text-lg">
          {receiverId}
        </div>
      </aside>      

      {/* Chat Area */}
      {receiverId.length > 0 && (
        <section className="flex-1 overflow-y-auto p-4 mt-2 md:mt-0">
          <GroupChatApp
            senderName={context?.studentData?.name || ""}
            senderRollNo={context?.studentData?.rollno || ""}
            groupName={context?.studentData?.section || ""}
          />
        </section>
      )}
    </div>
  );
};

export default Page;
