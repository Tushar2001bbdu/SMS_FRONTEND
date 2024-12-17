import { createContext, useState, useContext} from "react";
import { RoleContext } from "./RoleProvider";
import { useRouter } from "next/navigation";


export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [studentData, setStudentData] = useState(null);
  const [studentResult, setStudentResult] = useState(null);
  const [studentFeesPaymentDetails, setStudentFeesPaymentDetails] = useState(null);
  const [rollNumber, setRollNumbr] = useState(0);
  const [uploadUrl, setUploadUrl] = useState(null);
  const Role = useContext(RoleContext);
  const router = useRouter();




  // Async functions for various other operations
  async function StudentDetails() {
    let url = new URL(`http://localhost:3001/app/users/seeDetails`);
    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("firebaseToken"),
      },
    });
    response = await response.json();
    setStudentData(response.message);
  }

  function setRollNumber(rollno) {
    setRollNumbr(rollno); // Set the roll number state
  }

  async function StudentLogin(userDetails) {
    let url = new URL("http://localhost:3001/app/users/login");
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("firebaseToken"),
      },
      body: JSON.stringify({
        userDetails: userDetails
      }),
    });
    response=await response.json()
    if (response.status === 200) {
      Role?.changeRole("student",userDetails.rollNo,userDetails.email);
      router.push("/Details");
    }
  }

  async function getStudentResult() {
    let url = new URL(`http://localhost:3001/app/users/getResult`);
    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("firebaseToken"),
      },
    });
    response = await response.json();
    setStudentResult(response.message);
  }

  async function getStudentDetails() {
    let url = new URL(`http://localhost:3001/app/users/getDetails`);
    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("firebaseToken"),
      },
    });
    response = await response.json();
    setStudentFeesPaymentDetails(response.message);
  }
  async function getAssignmentUrl(filename) {
    
    let url = new URL(`http://localhost:3001/app/assignments/get-upload-url?filename=${filename}`);
    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("firebaseToken"),
      },
    });
    response = await response.json();
    setUploadUrl(response.uploadUrl)
  }

  async function logout() {
    localStorage.removeItem("firebaseToken");
    Role.changeRole(null);
    router.push("/Student_Services");
  }

  return (
    <AuthContext.Provider
      value={{
        StudentLogin,
        studentData,
        StudentDetails,
        studentResult,
        getStudentDetails,
        studentFeesPaymentDetails,
        getStudentResult,
        logout,
        setRollNumber,
        getAssignmentUrl,
        uploadUrl,
        setUploadUrl
    }}
    >
      {children}
    </AuthContext.Provider>
  );
}
