import React, { useState, useContext } from "react";
import { FacultyContext } from "../Context/FacultyProvider";
interface FacultyContextType {
  facultyData: any;
  studentProfile?: any;
  getStudentProfile?: (rollno: string) => Promise<any>;
  updateResult?: (rollno: string, marks: string | number) => Promise<void>;
}


interface StudentProfileProps {
  rollno: string;
  visibility: string;
  setVisibility:(visibility:string) => void;
}

const StudentProfile: React.FC<StudentProfileProps> = ({ rollno,visibility,setVisibility }) => {
  const [marks, setMarks] = useState<any>(0);
  const context = useContext<FacultyContextType | null>(FacultyContext);
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMarks(e.target.value);
  }
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if(context?.updateResult){
      context?.updateResult(rollno, marks);
    }
    
  }
  return (
    <div>
      <div
        id="authentication-modal"
        tabIndex={-1}
        aria-hidden="true"
        className={`${visibility} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Update Student Result
              </h3>
              <button
                type="button"
                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="authentication-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 md:p-5">
              <form
                className="space-y-4"
                action="#"
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
              >
                <div>
                  <label
                    htmlFor="rollno"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Student Email
                  </label>
                  <input
                    type="text"
                    name="rollno"
                    id="rollno"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="name@company.com"
                    value={rollno}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="marks"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Student Marks
                  </label>
                  <input
                    type="text"
                    name="marks"
                    id="marks"
                    value={marks}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Update Marks
                </button>
                <button
                  type="button"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => {
                    setVisibility("hidden");
                  }}
                >
                  Close Modal
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default StudentProfile;