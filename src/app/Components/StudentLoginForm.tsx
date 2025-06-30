"use client";
import React, { useContext, useState } from "react";

import Image from "next/image";
import { StudentContext } from "../Context/StudentProvider";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Auth } from "../utils/student_auth";
import { sendPasswordResetEmail } from 'firebase/auth'
import { toastBus } from "@/app/Components/Toast";
interface StudentContextType{
  StudentLogin: (details:{
    rollno: string,
    email: string,
    password: string,
  } ) => Promise<void>;
}
const Page: React.FC = () => 
 {
  const [userDetails, setUserDetails] = useState({
    rollno: "",
    email: "",
    password: "",
  });

  const User_Context = useContext<StudentContextType | null>(StudentContext);

  
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  }
  
  const handleReset = async () => {
    try {
      await sendPasswordResetEmail(Auth, userDetails.email);
     
    } catch (error) {
      toastBus.show("Kindly provide the email first", "error");
    }
  };
  async function handleSubmit(e: { preventDefault: () => void; }) {
    e.preventDefault();
    
    try {
      const userCredential = await signInWithEmailAndPassword(
        Auth,
        userDetails.email,
        userDetails.password
      );
      if (userCredential.user !== undefined) {
        const token = await userCredential.user.getIdToken();
        localStorage.setItem("firebaseToken", token);
        
        await User_Context?.StudentLogin(userDetails);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  }

  return (
    <div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <section className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            alt="Your Company"
            src="/graduated.png"
            height={"64"}
            width={"64"}
            className="mx-auto h-20 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </section>

        <section className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="rollno"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                University Roll Number
              </label>
              <div className="mt-2">
                <input
                  id="rollno"
                  name="rollno"
                  type="text"
                  value={userDetails.rollno}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  required
                  autoComplete="rollno"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={userDetails.email}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                    onClick={()=>{handleReset()}}
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={userDetails.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
export default Page;
