"use client";
import React, { useContext, useEffect} from 'react';
import { AuthContext } from '@/app/Context/AuthProvider'
import GroupChatApp from '@/app/Components/GroupChatApp'
interface teacherData {
    name: string
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
  const receiverId:string=context?.studentData?.section || "";
  useEffect(() => {
    if (context?.studentData === null) {
      context.StudentDetails();
    }
  }, [context]);

  return (
    <div className="flex max-h-[80wh]">
      <aside className="sm:w-1 lg:w-1/3 bg-gray-800 text-center text-white p-4">
        <h2 className="text-2xl font-bold mb-6">Class Groups</h2>
        <div className="space-y-4">
          {receiverId}
        </div>
      </aside>
      { receiverId.length>0 && <section className="sm:w-1 sd:w-2/3 lg:w-2/3 p-6">
        <GroupChatApp senderId={context?.studentData?.rollno} groupName={context?.studentData?.section} />
      </section> }
      
    </div>
  );
};

export default Page;
