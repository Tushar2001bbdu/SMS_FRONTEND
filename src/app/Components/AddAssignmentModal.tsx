import React, { FC, useState, useContext } from "react";
import { FacultyContext } from "../Context/FacultyProvider";
import { addAssignment } from "../graphql/queries";
import { useMutation } from "@apollo/client";
import { RoleContext } from "../Context/RoleProvider";

interface AddAssignmentModalProps {
  section : string;
  setIsOpen :(text:boolean)=>void
}
interface RoleContextType {
  role: any;
  changeRole: (newRole: any, rollno: any, email: any) => void;
  email: any;
  rollNumber: any;
}

interface FacultyDetails {
  rollno: string;
  [key: string]: any;
}

interface FacultyContextType {
  facultyData: any;
  facultyLogin?: (facultyDetails: FacultyDetails) => Promise<void>;
  getFacultyProfile?: () => Promise<void>;
  getAssignmentUrl?: (filename: string) => Promise<any>;
  uploadUrl?: string | null;
}

const AddAssignmentModal: FC<AddAssignmentModalProps> = ({ section,setIsOpen }) => {
  const [file, setFile] = useState<File | null>(null);
  const [subject, setSubject] = useState<string>("");
  const context = useContext<FacultyContextType | null>(FacultyContext);
  const [AddAssignment, { loading, error }] = useMutation(addAssignment);
  const role = useContext<RoleContextType | null>(RoleContext);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
      let filename = `${subject}${event.target.files[0].name}`;
      if(context?.getAssignmentUrl){
        context?.getAssignmentUrl(filename);
      }
     
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const title = formData.get("title") as string;
    const dateAssigned = formData.get("date-given") as string;
    const dueDate = formData.get("date-due") as string;
    if (context?.uploadUrl && context?.uploadUrl.length <= 0) {
      try{
        await fetch(context?.uploadUrl, {
          method: "PUT",
          body: file,
          headers: {
            "Content-Type": file?.type || "application/octet-stream",
          },
        });
      }
      catch(error){
        console.error(error);
      }
     
    } else {
      let inputData = {
        classCode: section,
        title: title,
        AssignmentLink: `https://student-assignment-questions.s3.ap-south-1.amazonaws.com/${file?.name}`,
        subject: subject,
        assignmentDate: dateAssigned,
        dueDate: dueDate,
        marks: 0,
        postedBy: role?.rollNumber,
      };
      await AddAssignment({
        variables: {
          input: inputData,
        },
      });
      setIsOpen(false);
    }
  };

  return (
    <div className="bg-opacity-50 flex w-full h-full items-center justify-center z-40">
      <div
        id="defaultModal"
        tabIndex={-1}
        className="overflow-y-auto overflow-x-hidden top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full"
      >
        <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
          <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Add Assignment
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="defaultModal"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <div className="grid gap-4 mb-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Enter Assignment Title"
                  />
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    value={subject}
                    onChange={(e) => {
                      setSubject(e.target.value);
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Enter Assignment Subject"
                  />
                </div>
                <div>
                  <label
                    htmlFor="date-given"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Assignment Date
                  </label>
                  <input
                    type="date"
                    name="date-given"
                    id="date-given"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="date-due"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Due Date
                  </label>
                  <input
                    type="date"
                    name="date-due"
                    id="date-due"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="section"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Class-Code
                  </label>
                  <input
                    value={section}
                    id="section"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="fileInput"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Upload Assignment
                </label>
                <input
                  type="file"
                  id="fileInput"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="w-full flex">
                  <label
                    htmlFor="fileInput"
                    className="w-1/3 cursor-pointer bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 transition"
                  >
                    Choose File
                  </label>
                  <span className="w-2/3 bg-white-500 border-black border-2 text-black px-4 py-2">
                    {file == null ? "No File Chosen" : file.name}
                  </span>
                </div>
              </div>
              <div className="mt-2 w-full flex items-center justify-center">
                <button
                  type="submit"
                  className="text-white inline-flex items-center bg-blue-500 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Add Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAssignmentModal;
