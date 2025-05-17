"use client";
import React, { useContext, useEffect,useState } from 'react';
import { FacultyContext,FacultyContextType } from '@/app/Context/FacultyProvider'
import ChatApp from '@/app/Components/ChatApp'
const Page: React.FC = () => {
  const context = useContext<FacultyContextType | null>(FacultyContext);
  const[receiverId,setReceiverId]=useState<string | null>(null);
  const[receiverName,setReceiverName]=useState<string | null>(null);
  useEffect(() => {
    if (context?.facultyData === null && context?.getFacultyProfile) {
      context.getFacultyProfile();
    }
  }, [context]);

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <aside className="w-full md:w-1/3 bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-bold mb-6">Students</h2>
        <div className="space-y-4">
          {context?.facultyData?.students.map((student:any, index:number) => (
            <div
              key={index}
              role="button"
              onClick={()=>{setReceiverId(student.rollno);setReceiverName(student.name)}}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <h2>bar</h2>
              <h2 className="text-gray-400">{student.rollno}</h2>
            </div>
          ))}
        </div>
      </aside>
      { receiverId!==null && <section className="w-full md:w-2/3 p-4">
        <ChatApp senderId={context?.facultyData.rollno} receiverId={receiverId} receiverName={receiverName}/>
      </section> }
      
    </div>
  );
};

export default Page;
