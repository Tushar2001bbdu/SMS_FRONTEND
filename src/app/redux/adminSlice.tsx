"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AnyARecord } from "node:dns";

// Initial state
const initialState = {
  examNotification: null,
  photoUploadUrl:null,
  classList: [],
  role: {
    email: null,
    rollNumber: null,
  },
  teacherList:[]
};

// Async Thunks for API Calls
export const login = createAsyncThunk("admin/login", async (userDetails: any) => {
  let url = `http://localhost:3001/app/details/login`;
  
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "authorization": localStorage.getItem("adminFirebaseToken") || "",
    },
    body: JSON.stringify({ userDetails }),
  });

  const data = await res.json();

  if (data.status!==200) {
    throw new Error(data.message || "Login failed"); // Use actual error message
  }

  return data; // Return parsed JSON response
});

export const sendPhoto = createAsyncThunk("admin/sendPhoto", async (image: any, { getState }: any) => {
  const role = getState().role;
  let url = `http://localhost:3001/app/attendance/sendphoto`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: image, rollno: role?.rollNumber }),
  });

  const data = await res.json();
  return data.message;
});

export const sendFrame = createAsyncThunk("admin/sendFrame", async (image: any, { getState }:any) => {
  const role = getState().role
  let url = `http://localhost:3001/app/exam/sendphoto`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: image, rollno: role?.rollNumber }),
  });

  const data = await res.json();
  return data.message;
});
export const getClassList = createAsyncThunk("admin/getClassList", async () => {
  let url = `http://localhost:3001/app/details/getClassList`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "authorization": localStorage.getItem("adminFirebaseToken") || "",
    },
  });

  const data = await res.json();
  
  return data.data;
});
export const getTeacherList = createAsyncThunk("admin/getTeacherList", async () => {
  let url = `http://localhost:3001/app/details/getTeacherList`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "authorization": localStorage.getItem("adminFirebaseToken") || "",
    },
  });

  const data = await res.json();
  
  return data.data;
});
export const getPhotoUploadUrl = createAsyncThunk("admin/getPhotoUploadUrl", async(filename: any)=> {
  try {

      const url = `http://localhost:3001/app/details/get-upload-url/${filename}`;
      
      const response = await fetch(url, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              authorization: localStorage.getItem("adminFirebaseToken") || ""
          }
      });

     

      const data = await response.json();

      if (data.status === 200) {
          return data.uploadUrl;
      } else {
          throw Error("you want to upload file in invalid format try again");
      }
  } catch (error:any) {
      throw Error("Error fetching upload URL:", error);
  }
})
// Slice Definition
const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(sendFrame.fulfilled, (state, action) => {
      state.examNotification = action.payload;
    });

    builder
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload && action.payload.status === "success") {
        } else {
          console.error(action.payload.message);
        }
      })
      .addCase(login.rejected, (state, action) => {
        console.error(action.error.message);
      });
      builder
      .addCase(getPhotoUploadUrl.fulfilled, (state, action) => {
        if (action.payload && action.payload.status === "success") {
          state.photoUploadUrl = action.payload;

        } else {
          console.error(action.payload.message);
        }
      })
      builder.addCase(getClassList.fulfilled, (state, action) => {
        state.classList = action.payload;
      }),
      builder.addCase(getTeacherList.fulfilled, (state, action) => {
        state.teacherList = action.payload;
      })
  },
 
});

export default adminSlice.reducer;
