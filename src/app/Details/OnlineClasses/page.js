"use client"
import OnlineClass from '@/app/Components/OnlineClass'
import { OnlineClassContext } from '@/app/Context/OnlineClassProvider'
import React,{useContext,useEffect,useState} from 'react'

export default function page() {
   const context=useContext(OnlineClassContext);
   const[emailId,setemailId]=useState(null);
   const[classSection,setClassSection]=useState(null);
   const[room,joinRoom]=useState(false)
 
 
   async function joinClass(){
   
   joinRoom(true)
   }
   
  return (

    <div className="w-4/6 h-1 flex flex-col justify-content-center align-items-center">
     
{room===false && <form onSubmit={(e)=>{e.preventDefault();joinClass()}}>
  <div class="mb-5">
    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Your Email</label>
    <input type="email" id="email" value={emailId} onChange={(e)=>setemailId(e.target.value)} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@example.com" required />
  </div>
  <div class="mb-5">
    <label for="classSection" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Your Class Section</label>
    <input type="text" id="password" value={classSection}  onChange={(e)=>setClassSection(e.target.value)}class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
  </div>

 
  <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Join Online Class</button>
</form>}

 {room===true && <OnlineClass meetingNumber={classSection} userName={emailId}/>}
    </div>
  )
}
