"use client"
import { AuthContext } from '@/app/Context/AuthProvider'
import React, { useContext, useEffect } from 'react'


export default function page() {

    const context = useContext(AuthContext)
    useEffect(() => {
        if(context.studentData===null){
            context.StudentDetails();
        }
        if(context?.studentResult===null){
            context.getStudentResult();
        }
        
    }, [context])

    if (context.studentResult)
        return (<div classNameName="h-full w-full">

            <dl className="mt-5 mb-5 max-w-full text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                <section className="flex flex-col pb-3 mx-auto mt-3">
                    <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Examination Result</dt>
                    <dd className="text-lg font-semibold">You have scored {context.studentResult.marks} percentage marks out of 100 Marks </dd>
                </section>
                <section className="flex flex-col py-3 mt-3">
                    <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Examination Grade</dt>
                    <dd className="text-lg font-semibold">You have scored {context.studentResult.grade} grade </dd>
                </section>
                <section className="flex flex-col pt-3 mt-3">
                    <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Attendance</dt>
                    <dd className="text-lg font-semibold">Your cummulative attendance is {context.studentResult.attendance} %</dd>
                </section>
            </dl>

        </div>

        )
}
