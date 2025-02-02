"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPhotoUploadUrl ,createTeacherRecord} from "../redux/adminSlice";
import { AppDispatch } from "@/app/redux/adminStore";
interface Props{
  setAddTeacher:(value:boolean)=> void;
}
const AddTeacher: React.FC<Props> = ({setAddTeacher}) => {
  const [formData, setFormData] = useState({
    email:"",
    rollno:"",
    name: "",
    age: 0,
    password: "",
    course: "",
    gender: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const dispatch = useDispatch<AppDispatch>();
  let photoUrl=useSelector((state:any)=>state.admin.photoUrl)
  let message=useSelector((state:any)=>state.admin.message)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    Object.entries(formData).forEach(([key, value]) => {
      if (typeof value === "number" && value === 0) {
        newErrors[key] = "This field is required";
      } else if (typeof value != "number" && !value.trim())
        newErrors[key] = "This field is required";
    });

    if (!file) newErrors["file"] = "Photograph is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (photoUrl) {
          await fetch(photoUrl, {
            method: "PUT",
            body: file,
            headers: {
              "Content-Type": file?.type || "application/octet-stream",
            },
          });
        }
        if (file) {
          dispatch(
            createTeacherRecord({
              email: formData.email,
              rollno: formData.rollno,
              name: formData.name,
             
              password: formData.password,
              course: formData.course,
              age: formData.age,
              gender: formData.gender,
              
              profilepictureLink: `https://school-managemengt-system-training.s3.ap-south-1.amazonaws.com/${file?.name}`,
            })
          );
        }
    
        if (message.length > 0) {
          alert(message);
          setAddTeacher(false);
        }
  };

  return (
    <div>
      <div
        id="crud-modal"
        tabIndex={-1}
        aria-hidden="false"
        className="inset-0 overflow-y-auto max-h-screen overflow-x-hidden z-50 flex justify-center items-center h-full"
      >
        <div className="relative p-4 max-w-md">
          <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600 border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Create Teacher Record
              </h3>
            </div>
            <form className="p-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 mb-4 grid-cols-4">
                {Object.keys(formData).map((key) => (
                  <div className="col-span-2" key={key}>
                    <label
                      htmlFor={key}
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {key.replace(/([a-z])([A-Z])/g, "$1 $2").toUpperCase()}
                    </label>
                    <input
                      type={key === "age" ? "number" : "text"}
                      name={key}
                      id={key}
                      value={formData[key as keyof typeof formData]}
                      onChange={handleChange}
                      className="bg-gray-50 border text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:text-white"
                      placeholder={`Enter ${key}`}
                    />
                    {errors[key] && (
                      <p className="text-red-500 text-sm">{errors[key]}</p>
                    )}
                  </div>
                ))}
              </div>
              <div className="my-3">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Add Photograph
                </label>
                <div>
                  <input
                    type="file"
                    id="fileInput"
                    className="hidden"
                    onChange={(e) => {
                      const selectedFile = e.target.files?.[0] || null;
                      setFile(selectedFile);
                      if (selectedFile) {
                        dispatch(getPhotoUploadUrl(selectedFile.name));
                      }
                    }}
                  />
                  <div className="w-full flex">
                    <label
                      htmlFor="fileInput"
                      className="w-1/2 cursor-pointer bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 transition"
                    >
                      Add Photograph
                    </label>
                    <span className="w-1/2 border-black border-2 text-black px-4 py-2">
                      {file ? file.name : "No File Chosen"}
                    </span>
                    {errors.file && (
                      <p className="text-red-500 text-sm">{errors.file}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  Add Teacher Record
                </button>
                <button
                  className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5"
                  onClick={()=>{setAddTeacher(false)}}
                >
                  Close Form
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTeacher;
