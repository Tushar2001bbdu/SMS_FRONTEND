"use client";
import React, { useContext, useEffect,useState } from 'react';
import { FacultyContext } from '@/app/Context/FacultyProvider'
import GroupChatApp from '@/app/Components/GroupChatApp'

interface FacultyContextType {
  facultyData: any;
  getFacultyProfile?: () => Promise<void>;

}
const Page: React.FC = () => {
  const context = useContext<FacultyContextType | null>(FacultyContext);
  const[receiverId,setReceiverId]=useState<string | null>(null);
  useEffect(() => {
    if (context?.facultyData === null && context?.getFacultyProfile) {
      context.getFacultyProfile();
    }
  }, [context]);

  return (
    <div className="flex max-h-[80wh]">
      <aside className="w-1/3 bg-gray-800 text-center text-white p-4">
        <h2 className="text-2xl font-bold mb-6">Classes</h2>
        <div className="space-y-4">
          {context?.facultyData?.allotedSections.map((section:any, index:number) => (
            <div
              key={index}
              role="button"
              className="w-full space-x-2 p-2 rounded-lg hover:bg-gray-700 transition-colors"
              onClick={()=>{setReceiverId(section)}}
            >
              <h2 className="text-gray-400">{section}</h2>
            </div>
          ))}
        </div>
      </aside>
      { receiverId && receiverId.length > 0 && <section className="w-2/3 p-6">
        <GroupChatApp senderId={context?.facultyData?.rollno} groupName={receiverId} />
      </section> }
      
    </div>
  );
};

export default Page;
