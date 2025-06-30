"use client";
import React, { useContext, useEffect,useState } from 'react';
import { FacultyContext,FacultyContextType } from '@/app/Context/FacultyProvider'
import GroupChatApp from '@/app/Components/GroupChatApp'


const Page: React.FC = () => {
  const context = useContext<FacultyContextType | null>(FacultyContext);
  const[receiverId,setReceiverId]=context?.facultyData?.section || "";
  const[sidebarOpen,setSidebarOpen]=useState(false);
  useEffect(() => {
    if (context?.facultyData === null && context?.getFacultyProfile) {
      context.getFacultyProfile();
    }
  }, [context]);

  return (
    <div className="flex flex-col md:flex-row md:flex-row h-[80vh]  overflow-hidden">
     
      <aside
        className={`fixed top-0 left-0 h-full w-64 z-40 bg-gray-800 text-white p-4 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:w-1/3 md:block`}
      >
       
        <div className="flex justify-between items-center mb-6 md:hidden">
          <h2 className="text-2xl font-bold">Class Groups</h2>
          
        </div>

        <div className="space-y-4  sticky text-center text-lg">
          {receiverId}
        </div>
      </aside>      

   
      {receiverId.length > 0 && (
        <section className="flex-1 overflow-y-auto p-4 mt-2 md:mt-0">
          <GroupChatApp
            senderName={context?.facultyData?.name || ""}
            senderRollNo={context?.facultyData?.rollno || ""}
            groupName={context?.facultyData?.section || ""}
          />
        </section>
      )}
    </div>
  );
};

export default Page;
