"use client"
import { AuthContext } from '@/app/Context/AuthProvider'
import React,{useContext,useEffect} from 'react'


export default function page() {
  
    const context=useContext(AuthContext)
    useEffect(()=>{
     context.getStudentResult();
    },[])

  if(context.studentResult!==null) 
    return(<div className="h-full w-full">
      
        <dl class="mt-5 mb-5 max-w-full text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
            <div class="flex flex-col pb-3 mx-auto mt-3">
                <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Examination Result</dt>
                <dd class="text-lg font-semibold">You have scored {context.studentResult.marks} percentage marks out of 100 Marks </dd>
            </div>
            <div class="flex flex-col py-3 mt-3">
                <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Examination Grade</dt>
                <dd class="text-lg font-semibold">You have scored {context.studentResult.grade} grade </dd>
            </div>
            <div class="flex flex-col pt-3 mt-3">
                <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Attendance</dt>
                <dd class="text-lg font-semibold">Your cummulative attendance is {context.studentResult.attendance} %</dd>
            </div>
        </dl>
        
            </div>
    
  )
}
