"use client"
import {useState,useContext} from "react";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";
import { AuthContext } from "@/app/Context/AuthProvider";
import { useDispatch } from "react-redux";
import { MarkAssignment } from "@/app/redux/adminSlice";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function Page(props) {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const context = useContext(AuthContext);
  const dispatch = useDispatch();

  const SUBMIT_ASSIGNMENT = gql`
    mutation submitAssignment($rollno: ID!, $title: String!, $solutionLink: String!) {
      submitAssignment(rollno: $rollno, title: $title, solutionLink: $solutionLink) {
        rollno
        title
        assignmentLink
        subject
        assignmentDate
        dueDate
        postedBy
      }
    }
  `;

  const [updateSubmission, { loading, error }] = useMutation(SUBMIT_ASSIGNMENT);

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    await context.getAssignmentUrl(`${selectedFile.name}`);
  };

  const handleUploadAssignment = async () => {
    if (!file) {
      alert("Please choose a file first.");
      return;
    }

    try {
      setIsUploading(true);
      if (context.uploadUrl) {
        await fetch(context.uploadUrl, {
          method: "PUT",
          body: file,
          headers: {
            "Content-Type": file.type,
          },
        });

        const s3Url = `https://assignmentssolutions.s3.ap-south-1.amazonaws.com/${file.name}`;

        await updateSubmission({
          variables: {
            rollno: props.assignment.rollno,
            title: props.assignment.title,
            solutionLink: s3Url,
          },
        });

        dispatch(
          MarkAssignment({
            rollno: props.assignment.rollno,
            s3Link: s3Url,
            fileType: file.type,
            subject: props.assignment.subject,
          })
        );

        context.setUploadUrl(null);
        setIsUploading(false);
        alert("Assignment submitted successfully!");
      } else {
        await context.getAssignmentUrl(file.name);
      }
    } catch (err) {
      console.error("Upload error:", err);
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white border border-gray-200 rounded-lg shadow p-6 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col items-center">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src="https://cdn-icons-png.flaticon.com/512/5842/5842026.png"
          alt="Assignment Icon"
        />
        <h5 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">
          {props.assignment.title}
        </h5>
        <span className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          {props.assignment.subject}
        </span>

        <input
          type="file"
          className="block w-full text-sm text-gray-500 mb-3"
          onChange={handleFileChange}
        />

        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 w-full">
          <a
            href={props.assignment.assignmentLink}
            className="mb-2 sm:mb-0 inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Assignment
          </a>

          {props.assignment.submitted ? (
            <span className="inline-block py-2 px-4 text-sm font-medium text-green-700 bg-green-100 rounded text-center">
              Assignment Submitted
            </span>
          ) : (
            <button
              onClick={handleUploadAssignment}
              className={`inline-block py-2 px-4 text-sm font-medium text-white bg-green-600 rounded hover:bg-green-700 ${
                isUploading || loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isUploading || loading}
            >
              {isUploading || loading ? "Submitting..." : "Submit Assignment"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
