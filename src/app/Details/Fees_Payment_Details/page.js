"use client"
import { AuthContext } from '@/app/Context/AuthProvider'
import React,{useContext,useEffect} from 'react'


export default function page() {
    const context=useContext(AuthContext)
    useEffect(()=>{
        context.getStudentDetails()
    },[])
    if(context!==null && context.studentFeesPaymentDetails!==null){
        return (

            <div className='my-7  align-items-center justify-content-center'>
            <div className="heading text-center my-3">
            <h2 class="text-4xl font-extrabold dark:text-white my-auto">Your Fees Payment Details</h2>
            </div>
             
        
        <div class=" relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Student ID
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Fees Type
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Fees Paid
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Fees Still Remaining
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Total Fees To Be Paid
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {context.studentFeesPaymentDetails.rollno}
                        </th>
                        <td class="px-6 py-4">
                            Academic Fees
                        </td>
                        <td class="px-6 py-4">
                        {context.studentFeesPaymentDetails.AcademicFeesPaid}
                        </td>
                        <td class="px-6 py-4">
                        {55000-context.studentFeesPaymentDetails.AcademicFeesPaid}
                        </td>
                        <td class="px-6 py-4">
                        55000
                        </td>
                    </tr>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {context.studentFeesPaymentDetails.rollno} 
                        </th>
                        <td class="px-6 py-4">
                        Training and Placement Fees
                        </td>
                        <td class="px-6 py-4">
                        {context.studentFeesPaymentDetails.TandPFeesPaid}
                        </td>
                        <td class="px-6 py-4">
                        {2500 - context.studentFeesPaymentDetails.TandPFeesPaid}
                        </td>
                        <td class="px-6 py-4">
                            2500
                        </td>
                    </tr>
                    <tr class="bg-white dark:bg-gray-800">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {context.studentFeesPaymentDetails.rollno}
                        </th>
                        <td class="px-6 py-4">
                        Total Fees Paid
                        </td>
                        <td class="px-6 py-4">
                        {context.studentFeesPaymentDetails.TotalFeesPaid}
                        </td>
                        <td class="px-6 py-4">
                        {75000-context.studentFeesPaymentDetails.TotalFeesPaid}
                        </td>
                        <td class="px-6 py-4">
                        75000
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className='heading text-center my-3'>
            Status of your Libary Availed :{context.studentFeesPaymentDetails.LibraryAvailed}
            </div>
           
        </div>
        
            </div>
          )
    }
 
}
