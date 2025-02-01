"use client";
import React, { useState } from "react";

interface Props {
  section: string;
}
import { useDispatch,useSelector } from "react-redux";
import { createStudentRecord, getPhotoUploadUrl } from "../redux/adminSlice";
import { AppDispatch } from "@/app/redux/adminStore";


const AddStudent: React.FC<Props> = ({ section }) => {
  let photoUrl= useSelector((state: any) => state.admin.photoUploadUrl);
  let message=useSelector((state:any)=> state.admin.message)
  const [formData, setFormData] = useState({
    email:"tusharkumargupta8dec2001@bbdu.ac.in",
    name: "",
    rollno: "",
    password: "",
    course: "",
    section: section || "",
    branch: "",
    classteacher: "",
    trollno: "",
  });
  const [file, setFile] = useState<any>(null);
  const dispatch = useDispatch<AppDispatch>();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};
    
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) newErrors[key] = "This field is required";
    });

    if (!file) newErrors["file"] = "Photograph is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    if(photoUrl){
      
        await fetch(photoUrl, {
          method: "PUT",
          body: file,
          headers: {
            "Content-Type": file?.type || "application/octet-stream",
          },
        });
    }
    if(file){
      dispatch(createStudentRecord({
        email: formData.email,
        rollno: formData.rollno,
        name: formData.name,
        password: formData.password,
        course: formData.course,
        section: formData.section,
        branch: formData.branch,
        classteacher:formData.classteacher,
        teacherrollno: formData.trollno,
        profilepictureLink: `https://school-managemengt-system-training.s3.ap-south-1.amazonaws.com/${file?.name}`
      }))
    }

   if(message.length>0){
    alert(message);
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
                Create Student Record
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
                      type={key === "rollno" || key === "trollno" ? "number" : "text"}
                      name={key}
                      id={key}
                      value={formData[key as keyof typeof formData]}
                      onChange={handleChange}
                      className="bg-gray-50 border text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:text-white"
                      placeholder={`Enter ${key}`}
                    />
                    {errors[key] && <p className="text-red-500 text-sm">{errors[key]}</p>}
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
                      const selectedFile = e.target.files?.[0];
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
                    {errors.file && <p className="text-red-500 text-sm">{errors.file}</p>}
                  </div>
                  </div>
                  
                  
                </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  Add Student Record
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;