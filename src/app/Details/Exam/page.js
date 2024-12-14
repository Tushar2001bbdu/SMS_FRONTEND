"use client"
import OnlineExam from '@/app/Components/OnlineExam'
import React, { useState, useContext } from 'react'
import { AuthContext } from "@/app/Context/AuthProvider"
import { signInWithEmailAndPassword } from "firebase/auth";
import { Auth } from '@/app/utils/student_auth';
import { useRouter } from 'next/navigation'
export default function Page() {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",

  });

  const context = useContext(AuthContext);
  const router = useRouter()
  const [exam, startExam] = useState(false)
  function handleChange(event) {
    setUserDetails({ ...userDetails, [event.target.name]: event.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        Auth,
        userDetails.email,
        userDetails.password
      );
      if(userCredential.user!==undefined){
        const token = await userCredential.user.getIdToken();
        localStorage.setItem("firebaseToken", token);
  
        // Store rollno in localStorage after successful login (backup in case)
        localStorage.setItem("rollno", "1210437010");
  
        // Call StudentLogin from AuthContext
        await context.StudentLogin({ ...userDetails });
        let id = "1210437010"
        router.push(`/Details/Exam/StartExam`)
      }
      


    } catch (error) {
      console.error("Login error:", error);
    }
  }


  return (
    <>
      {
        exam === false && <div className='mx-3'>
          <div>
            <section className="absolute w-full top-3">

              <div className="container mx-auto px-4 h-full">
                <div className="flex content-center items-center justify-center h-full">
                  <div className="w-full lg:w-4/12 px-4 pt-32">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">

                      <div className="flex-auto px-4 lg:px-10 py-10 pt-0">

                        <form onSubmit={(e) => { handleSubmit(e) }}>
                          <div className="relative w-full mb-3">
                            <label className="block uppercase text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">University Email</label>
                            <input type="email" name="email" value={userDetails.email} onChange={(e) => { handleChange(e) }} className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full" placeholder="Email" style={{ transition: "all 0.15s ease 0s" }} />
                          </div>
                          <div className="relative w-full mb-3">
                            <label className="block uppercase text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">Password</label>
                            <input type="password" name="password" value={userDetails.password} onChange={(e) => { handleChange(e) }} className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full" placeholder="Password" style={{ transition: "all 0.15s ease 0s" }} />
                          </div>
                          <div>
                            <label className="inline-flex items-center cursor-pointer">
                              <input id="customCheckLogin" type="checkbox" className="form-checkbox text-gray-800 ml-1 w-5 h-5" style={{ transition: "all 0.15s ease 0s" }} />
                              <span className="ml-2 text-sm font-semibold text-gray-700">Remember me</span>
                            </label>
                          </div>
                          <div className="text-center mt-6">
                            <button className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full" type="submit" style={{ transition: "all 0.15s ease 0s" }}>Sign In</button>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className="flex flex-wrap mt-6">
                      <div className="w-1/2">
                        <a href="#" className="text-gray-300"><small>Forgot password?</small></a>
                      </div>
                      <div className="w-1/2 text-right">
                        <a href="#" className="text-gray-300"><small>Create new account</small></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </section>
          </div>
        </div>
      }
      {
        exam === true && <OnlineExam />
      }
    </>


  );
}
