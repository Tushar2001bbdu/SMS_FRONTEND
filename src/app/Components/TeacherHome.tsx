"use client"
import React, { useContext, useEffect } from "react";
import { format } from "date-fns";
import { Roboto } from 'next/font/google'
import Chart from "../Components/Chart";
import Image from "next/image";
import { FacultyContext } from "../Context/FacultyProvider";
interface RoleContextType {
    role: any;
    changeRole: (newRole: any, rollno: any, email: any) => void;
    email: any;
    rollNumber: any;

}
interface FacultyContextType {
    facultyData: any;
    getFacultyProfile?: () => Promise<void>;
    studentProfile?: any;
    getStudentProfile?: (rollno: string) => Promise<any>;
    updateResult?: (rollno: string, marks: string | number) => Promise<void>;
    uploadUrl?: string | null;
    getAssignmentUrl?: (filename: string) => Promise<any>;

    logout?: () => void;
}
const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400', '700'],
});

const Page: React.FC = () => {

    
    const teacher = useContext<FacultyContextType | null>(FacultyContext)
    useEffect(() => {
        if(teacher?.getFacultyProfile){
        console.log("You are tying to call me")
        teacher?.getFacultyProfile()}
    }, [])
    
    if (teacher?.facultyData !== null && teacher?.facultyData!==undefined) {
        console.log(teacher?.facultyData)
        return (
            <div className="my-4 text-grey-500 w-full text-bold">
                <div className="grid text-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <section className="bg-blue-200 p-4 rounded-lg">
                        <Image src="/students.png" alt="student" className="mx-auto" width={100} height={100} />
                        <header className="text-gray-700">Total Students</header>
                        <p>{teacher?.facultyData.studentslist.length}</p>
                    </section>
                    <section className="bg-blue-200 p-4 rounded-lg">
                        <Image src="/teacher.png" alt="student" className="mx-auto" width={100} height={100} />
                        <header>Total Classes</header>
                        <p>{teacher?.facultyData.allotedSections.length}</p>
                    </section>
                    <section className="bg-blue-200 p-4 rounded-lg">
                        <Image src="/teaching_13293239.png" alt="student" className="mx-auto" width={100} height={100} />
                        <header>Gender</header>
                        <p>{teacher?.facultyData.gender==="Male"?"Male":"Female"}</p>
                    </section>

                </div>

                <div className="my-4 grid w-full mx-auto grid-cols-2">
                    <section>
                        <header className="w-full text-center">Last Updated At :{format(new Date(teacher?.facultyData.attendance.updatedAt), "MMMM dd, yyyy") }</header>
                        
                        <div className="mt-2">
                            <Chart label1={"present"} label2={"absent"} data1={teacher?.facultyData.attendance.value} data2={100 - teacher?.facultyData.attendance.value} />
                        </div>
                    </section>
                    
                </div>
            </div>
        )
    }
}
export default Page;
