"use client";
import  {useContext} from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RoleContext } from "../Context/RoleProvider";
import { useRouter } from "next/navigation";
interface RoleContextType {
  role: any;
  changeRole: (newRole: any,rollno:any,email:any) => void;
  email:any;
  rollNumber:any;

}
const initialState = {
  examNotification: null,
  photoUploadUrl: null,
  classList: [],
  message: "",
  role: {
    email: null,
    rollNumber: null,
  },
  teacherList: [],
};
 
export const login = createAsyncThunk(
  "admin/login",
  async (userDetails: any) => {
    let url = `https://project-backend.online/app/details/login`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("adminFirebaseToken") || "",
      },
      body: JSON.stringify({ userDetails }),
    });

    const data = await res.json();

    if (data.status !== 200) {
      localStorage.removeItem("adminFirebaseToken")
      throw new Error(data.message || "Login failed");
    }

    return data;
  }
);
export const logout = createAsyncThunk(
  "admin/logout",
  async () => {
    const Role = useContext(RoleContext) as RoleContextType | null;
    const router=useRouter();
    Role?.changeRole(null,-1,-1);
    localStorage.removeItem('adminFirebaseToken');
    router.push("/administrator")
    return "You have Logged In Successfully"
    
  }
);
export const sendPhoto = createAsyncThunk(
  "admin/sendPhoto",
  async ({ image, rollno }: { image: any; rollno: string }) => {
    try{
   
    console.log("The image is"+image)
    let url = `https://project-backend.online/app/attendance/sendphoto`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({ url: image, rollno:rollno}),
    });

    const data = await res.json();
    console.log(data)
    return data.message;
  }
  catch(err){
    console.log(err)
  }
  }
);
export const createClass = createAsyncThunk(
  "admin/createClass",
  async (name: string) => {
    console.log("the class name is"+name)
    let url = `https://project-backend.online/app/details/createClass`;

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json",
        authorization: localStorage.getItem("adminFirebaseToken") || "",
       },
      body: JSON.stringify({ className: name }),
    });

    const data = await res.json();
    return data.message;
  }
);

export const sendFrame = createAsyncThunk(
  "admin/sendFrame",
  async (image: any, { getState }: any) => {
    const role = getState().role;
    let url = `https://project-backend.online/app/exam/sendphoto`;

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: image, rollno: role?.rollNumber }),
    });

    const data = await res.json();
    return data.message;
  }
);
export const getClassList = createAsyncThunk("admin/getClassList", async () => {
  let url = `https://project-backend.online/app/details/getClassList`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("adminFirebaseToken") || "",
    },
  });

  const data = await res.json();

  return data.data;
});
export const MarkAssignment = createAsyncThunk("admin/markAssignment", async (file:{rollno:string,s3Link:string,fileType:string,subject:string}) => {
  let url = `https://project-backend.online/app/assignments/markAssignment/${file.rollno}`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("adminFirebaseToken") || "",
    },
    body:JSON.stringify({s3Link:file.s3Link, fileType:file.fileType,subject:file.subject})
  });

  const data = await res.json();
  console.log(data)
  return data.data;
});
export const getTeacherList = createAsyncThunk(
  "admin/getTeacherList",
  async () => {
    let url = `https://project-backend.online/app/details/getTeacherList`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("adminFirebaseToken") || "",
      },
    });

    const data = await res.json();

    return data.data;
  }
);
export const getPhotoUploadUrl = createAsyncThunk(
  "admin/getPhotoUploadUrl",
  async (filename: any) => {
    try {
      const url = `https://project-backend.online/app/details/get-upload-url/${filename}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("adminFirebaseToken") || "",
        },
      });

      const data = await response.json();

      if (data.status === 200) {
        return data.data;
      } else {
        throw Error("you want to upload file in invalid format try again");
      }
    } catch (error: any) {
      throw Error("Error fetching upload URL:", error);
    }
  }
);
export const createStudentRecord = createAsyncThunk(
  "admin/createStudentRecord",
  async (userDetails: {
    email: string;
    rollno: string;
    name: string;
    password: string;
    course: string;
    section: string;
    branch: string;
    classteacherrollno: string;
    profilepictureLink: string;
  }) => {
    let url = `https://project-backend.online/app/details/createStudentRecord`;
    let response: any = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("adminFirebaseToken") || "",
      },
      body: JSON.stringify({ userDetails }),
    });

    response = await response.json();
    return response.message;
  }
);
export const createTeacherRecord = createAsyncThunk(
  "admin/createTeacherRecord",
  async (userDetails: {
    email: string;
    rollno: string;
    name: string;
    password: string;
    course: string;
    age: number;
    gender: string;
    profilepictureLink: string;
  }) => {
    let url = `https://project-backend.online/app/details/createTeacherRecord`;
    let response: any = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("adminFirebaseToken") || "",
      },
      body: JSON.stringify({ userDetails }),
    });

    response = await response.json();
    return response.message;
  }
);
export const deleteStudentRecord = createAsyncThunk(
  "admin/deleteStudentRecord",
  async (userDetails: { rollno: string; section: string }) => {
    let url = `https://project-backend.online/app/details/deleteStudentRecord/${userDetails.rollno}/${userDetails.section}`;
    let response: any = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("adminFirebaseToken") || "",
      },
      body: JSON.stringify({ userDetails }),
    });

    response = await response.json();
    return response.message;
  }
);

export const deleteTeacherRecord = createAsyncThunk(
  "admin/deleteTeacherRecord",
  async (userDetails: { rollno: string }) => {
    let url = `https://project-backend.online/app/details/deleteTeacherRecord/${userDetails.rollno}`;
    let response: any = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("adminFirebaseToken") || "",
      },
      body: JSON.stringify({ userDetails }),
    });

    response = await response.json();
    return response.message;
  }
);
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
       console.log("logged in successfully")
      })
      .addCase(login.rejected, (state, action) => {
        console.error(action.error.message);
        localStorage.removeItem("adminFirebaseToken")
      });
    builder.addCase(createStudentRecord.fulfilled, (state, action) => {
      state.message = action.payload;
    });
    builder.addCase(createStudentRecord.rejected, (state, action) => {
      state.message =
        typeof action.payload === "string"
          ? action.payload
          : "creating student record failed";
      localStorage.removeItem("adminFirebaseToken")
    });
    builder.addCase(deleteStudentRecord.fulfilled, (state, action) => {
      state.message = action.payload;
    });
    builder.addCase(deleteStudentRecord.rejected, (state, action) => {
      state.message =
        typeof action.payload === "string"
          ? action.payload
          : "deleting student record failed";
      localStorage.removeItem("adminFirebaseToken")
    });
    builder.addCase(deleteTeacherRecord.fulfilled, (state, action) => {
      state.message = action.payload;
    });
    builder.addCase(deleteTeacherRecord.rejected, (state, action) => {
      state.message =
        typeof action.payload === "string"
          ? action.payload
          : "deleting teacher record failed";
      localStorage.removeItem("adminFirebaseToken")
    });
    builder.addCase(createTeacherRecord.fulfilled, (state, action) => {
      state.message = action.payload;
    });
    builder.addCase(createTeacherRecord.rejected, (state, action) => {

      state.message =
        typeof action.payload === "string"
          ? action.payload
          : "creating teacher record failed";
      localStorage.removeItem("adminFirebaseToken")
    });
    builder.addCase(getPhotoUploadUrl.fulfilled, (state, action) => {
      state.photoUploadUrl = action.payload;
    });
    builder.addCase(getClassList.fulfilled, (state, action) => {
      state.classList = action.payload;
    }),
    builder.addCase(getClassList.rejected, (state, action) => {
      console.log(action.payload)
      localStorage.removeItem("adminFirebaseToken")
    }),
      builder.addCase(getTeacherList.fulfilled, (state, action) => {
        state.teacherList = action.payload;
      });
  },
});

export default adminSlice.reducer;
