"use client";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/app/Context/AuthProvider";
import ChatApp from "@/app/Components/ChatApp";

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

interface StudentContextType {
  studentData: StudentData | null;
  StudentDetails: () => Promise<any>;
}

const Page: React.FC = () => {
  const context = useContext<StudentContextType | null>(AuthContext);
  const [receiverId, setReceiverId] = useState<string | null>(null);
  const [receiverName, setReceiverName] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false); 
  useEffect(() => {
    if (context?.studentData === null) {
      context.StudentDetails();
    }
  }, [context]);

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
    
     
      <aside
        className={`fixed z-40 top-0 left-0 h-full w-64 bg-gray-800 text-white p-4 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:w-1/3 md:block`}
      >
        <div className="flex justify-between items-center mb-6 md:hidden">
          <h2 className="text-2xl font-bold">Faculty</h2>
          <button onClick={() => setSidebarOpen(false)}>✕</button>
        </div>

        <div className="space-y-4">
          {context?.studentData?.teacherrollno.map((teacher, index) => (
            <div
              key={index}
              role="button"
              onClick={() => {
                setReceiverId(teacher.rollno);
                setReceiverName(teacher.name);
                setSidebarOpen(false); // auto-close on mobile
              }}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <span>{teacher.name}</span>
              <span className="text-gray-400">{teacher.rollno}</span>
            </div>
          ))}
        </div>
      </aside>

      
      {receiverId !== null && (
        <section className="flex-1 overflow-y-auto p-4 mt-2 md:mt-0">
          <ChatApp
            senderId={context?.studentData?.rollno}
            receiverId={receiverId}
            receiverName={receiverName}
          />
        </section>
      )}
    </div>
  );
};

export default Page;
