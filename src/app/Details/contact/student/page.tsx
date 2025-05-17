"use client";
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/app/Context/AuthProvider';
import ChatApp from '@/app/Components/ChatApp';

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

  useEffect(() => {
    if (context?.studentData === null) {
      context.StudentDetails();
    }
  }, [context]);

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <aside className="w-full md:w-1/3 bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-bold mb-6">Faculty</h2>
        <div className="space-y-4">
          {context?.studentData?.teacherrollno.map((teacher, index) => (
            <div
              key={index}
              role="button"
              onClick={() => {
                setReceiverId(teacher.rollno);
                setReceiverName(teacher.name);
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
        <section className="w-full md:w-2/3 p-4">
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
