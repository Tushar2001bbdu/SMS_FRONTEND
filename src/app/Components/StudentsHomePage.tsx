"use client"
import React ,{useContext,useEffect} from 'react';
import { Roboto ,Josefin_Sans} from 'next/font/google'
import { RoleContext } from '@/app/Context/RoleProvider';
import Chart from "../Components/Chart";
import { AuthContext } from "../Context/AuthProvider";
import Image from "next/image";
interface RoleContextType {
    role: any;
    changeRole: (newRole: any,rollno:any,email:any) => void;
    email:any;
    rollNumber:any;
  
  }
interface StudentContextType{
    StudentDetails: () => Promise<any>;
    studentData: any;
    getStudentResult: () => Promise<any>;
    studentResult:any;
}
const josefinSans = Josefin_Sans({ subsets: ['latin'], weight: [ '700']});
const StudentsHomePage: React.FC = () => {
    
    useEffect(()=>{
        if(student?.studentData===null || student?.studentResult===null){
            student?.StudentDetails();
            student?.getStudentResult();
        }
    },[])
    const student =useContext<StudentContextType | null>(AuthContext)
    if(student?.studentData && student?.studentResult)
    return(

    <div className={` ${josefinSans.className} my-4 w-full text-grey-500` }>
    <div className="grid text-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
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

    <div className="my-4 flex flex-row flex-wrap justify-center gap-4">
     <div className="mt-2">
     <Chart label1={"present"} label2={"absent"} title={"Class Attendance"} data1={student?.studentResult.attendance} data2={100-student?.studentResult.attendance} />
        </div>
    
     <div className="mt-2">
     <Chart label1={"marks scored"} label2={"others"} title={"Marks Scored"} data1={student?.studentResult.marks} data2={100-student?.studentResult.marks} />
        </div>
    </div>
    </div>
)
};

export default StudentsHomePage;