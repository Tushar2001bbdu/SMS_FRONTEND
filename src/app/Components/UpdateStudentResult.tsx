import React, { useState, useContext } from "react";
import { FacultyContext } from "../Context/FacultyProvider";


interface FacultyContextType {
  facultyData: any;
  facultyLogin: (facultyDetails: any) => Promise<void>;
  getFacultyProfile: () => Promise<void>;
  studentProfile: any;
  getStudentProfile: (rollno: string) => Promise<any>;
  updateResult: (rollno: string, marks: string | number) => Promise<void>;
  getAssignmentUrl: (filename: string) => Promise<void>;
  uploadUrl: string | null;
  logout: () => void;
}

interface StudentProfileProps {
  rollno: string;
  visibility: string;
  setVisibility: (visibility: string) => void;
}

const Page: React.FC<StudentProfileProps> = ({ rollno, visibility, setVisibility }) => {
  const [marks, setMarks] = useState<string | number>(0);
  const context = useContext(FacultyContext) as FacultyContextType;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMarks(e.target.value);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (context?.updateResult) {
      await context.updateResult(rollno, marks);
      alert("Marks updated successfully!");
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
                onClick={() => setVisibility("hidden")}
                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 md:p-5">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="rollno" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Student Email
                  </label>
                  <input
                    type="text"
                    name="rollno"
                    id="rollno"
                    value={rollno}
                    disabled
                    className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                  />
                </div>
                <div>
                  <label htmlFor="marks" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Student Marks
                  </label>
                  <input
                    type="number"
                    name="marks"
                    id="marks"
                    value={marks}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  Update Marks
                </button>
                <button
                  type="button"
                  onClick={() => setVisibility("hidden")}
                  className="w-full text-white bg-gray-500 hover:bg-gray-600 font-medium rounded-lg text-sm px-5 py-2.5"
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
};

export default Page;
