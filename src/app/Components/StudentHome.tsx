"use client"
import React,{useContext,useEffect} from "react";
import { Roboto } from 'next/font/google'
import { RoleContext } from "../Context/RoleProvider";
import Chart from "../Components/Chart";
import { AuthContext } from "../Context/AuthProvider";
import Image from "next/image";
interface RoleContextType {
    role: any;
    changeRole: (newRole: any,rollno:any,email:any) => void;
    email:any;
    rollNumber:any;
  
  }
interface studentContextType{
    StudentDetails: () => Promise<any>;
    studentData: any;
    getStudentResult: () => Promise<any>;
    studentResult:any;
}
const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400', '700'],
  });

const Page: React.FC = () => {

const role=useContext<RoleContextType | null>(RoleContext)
const student=useContext<studentContextType | null>(AuthContext)
useEffect(()=>{
    student?.getStudentResult()
    student?.StudentDetails()
},[])
return(
    <div className="my-4 text-grey-500">
        <div className="grid text-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <section className="bg-blue-200 p-4 rounded-lg">
                <Image src="/students.png" alt="student" className="mx-auto"  width={100} height={100} />
                <header className="text-gray-700">Total Students</header>
                <p>{student?.studentData.teacherrollno.length}</p>
            </section>
            <section className="bg-blue-200 p-4 rounded-lg">
                <Image src="/teacher.png" alt="student" className="mx-auto"  width={100} height={100} />
                <header>Total Teachers</header>
                <p>{student?.studentData.teacherrollno.length}</p>
            </section>
            <section className="bg-blue-200 p-4 rounded-lg">
                <Image src="/teaching_13293239.png" alt="student" className="mx-auto"   width={100} height={100} />
                <header>Class Teacher</header>
                <p>{student?.studentData.teacherrollno[0].name}</p>
            </section>
            
        </div>

        <div className="my-4 grid text-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <section>
         <header className={roboto.className}> Class Attendance</header>
         <div className="mt-2">
         <Chart label1={"present"} label2={"absent"}data1={student?.studentResult.attendance} data2={100-student?.studentResult.attendance} />
            </div>
        </section>
        <section>
         <header className={roboto.className}>Performance</header>
         <div className="mt-2">
         <Chart label1={"marks scored"} label2={"others"}data1={student?.studentResult.marks} data2={100-student?.studentResult.marks} />
            </div>
        </section>
        </div>
        </div>
    )
}
export default Page;
