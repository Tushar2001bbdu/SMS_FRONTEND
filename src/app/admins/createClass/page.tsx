"use client";
import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Button from '@mui/material/Button';
import { createClass, getClassList } from "@/app/redux/adminSlice";
import { AppDispatch } from "@/app/redux/adminStore";
import TextField from '@mui/material/TextField';


const Page: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const classList = useSelector((state: any) => state.admin.classList);
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };
  const handleSubmit=()=>{
    dispatch(createClass(inputValue))
  }
  useEffect(() => {
    dispatch(getClassList());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="text-2xl font-bold text-center text-gray-800 mb-6">Class Groups</div>

      <div className="flex justify-center mb-6">
        <TextField variant="outlined" onChange={(e)=>{handleChange(e)}} />
        <Button variant="contained" onClick={()=>{handleSubmit()}} color="primary">
          Add Class
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 sm:px-0">
        {classList?.length > 0 ? (
          classList.map((item: any, index: number) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Class Code: {item.code}</h3>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">No class groups available.</p>
        )}
      </div>
    </div>
  );
};

export default Page;
