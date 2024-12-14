"use client"
import StudentProfile from '@/app/Components/StudentProfile'
import { FacultyContext } from '@/app/Context/FacultyProvider'
import { Visibility } from '@mui/icons-material'
import React,{useContext,useEffect,useState,useRef} from 'react'
export default function page() {
const context=useContext(FacultyContext)
const[visbility,setVisbilty]=useState("hidden")
const[section,setSection]=useState(null)
const[studentList,setStudentList]=useState(null)
async function getListOfStudent(section){
    let url = new URL(`http://localhost:3001/app/teachers/listOfStudents`);
    url.searchParams.set("section", section);
    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("teacherFirebaseToken"),
      },
    })
    console.log("The RESPONSE is: " + response);
    setStudentList(response.studentList);
}
useEffect(()=>{
    setVisbilty('hidden')
},[section])
    return (
      <>
      <div className="text-center mt-4 mr-4">
         <div className="flex flex-row w-full justify-between">
         
        <div className='text-center w-full'>
          Student List
        </div>
         <div>
          
         <button id="dropdownDefaultButton" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button" onClick={()=>{setVisbilty('block')}}>
         Select Section
         <svg class="w-1.5 h-1.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
             <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
         </svg>
     </button>
     
     
     <div id="dropdown" class={` ${visbility} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
         <ul class="py-2 text-sm text-gray-700 dark:text-gray-200">
           <li><a  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={()=>{getListOfStudent('CCML-4')}}>CCML-4</a></li>
           <li><a  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={()=>{getListOfStudent('CCML-3')}}>CCML-3</a></li>
           <li><a  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={()=>{getListOfStudent('CCML-2')}}>CCML-2</a></li>
           <li><a  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={()=>{getListOfStudent('CCML-1')}}>CCML-1</a></li>
         </ul>
     </div>
         </div>
         </div>
        
     
         
         <div class={`relative  ${visbility} overflow-x-auto shadow-md sm:rounded-lg`}>
             <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                 <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                     <tr>
                         <th scope="col" class="px-6 py-3">
                             University Roll Number
                         </th>
                         <th scope="col" class="px-6 py-3">
                             Name
                         </th>
                         <th scope="col" class="px-6 py-3">
                             Section
                         </th>
                         <th scope="col" class="px-6 py-3">
                             Result
                         </th>
                         <th scope="col" class="px-6 py-3">
                             Attendance
                         </th>
                     </tr>

                 </thead>
                 <tbody>
                 {studentList!==undefined && studentList!==null && studentList.map((element,index)=>{
                  return (<StudentProfile key={index} profile={element}/>)
                 })}
                    
                   
                 </tbody>
             </table>
         </div>
            
             
           
      </div>
        </>
      )
}
  

