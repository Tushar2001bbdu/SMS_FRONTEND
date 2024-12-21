import React, { useState, useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { gql, useMutation } from "@apollo/client";

export default function StudentAssignment(props) {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const context = useContext(AuthContext);

  const SUBMIT_ASSIGNMENT = gql`
    mutation submitAssignment($rollno: ID!, $title: String!, $solutionLink: String!) {
      submitAssignment(rollno: $rollno, title: $title, solutionLink: $solutionLink) {
        rollno
        title
        AssignmentLink
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
    await context.getAssignmentUrl(`${props.assignment.subject}/${selectedFile.name}`);
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

        await updateSubmission({
          variables: {
            rollno: props.assignment.rollno,
            title: props.assignment.title,
            solutionLink: `https://assignment-solutions.s3.ap-south-1.amazonaws.com/${file.name}`,
          },
        });

        context.setUploadUrl(null);
        setIsUploading(false);
        alert("Assignment submitted successfully!");
      }
      else{
        context.getAssignmentUrl(file.name)
      }
    } catch (error) {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-end px-4 pt-4">
        <div className="flex flex-col items-center pb-10">
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            src="https://cdn-icons-png.flaticon.com/512/5842/5842026.png"
            alt="Icon Of An Assignment"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {props.assignment.title}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {props.assignment.subject}
          </span>
          <input
            type="file"
            className="mt-2 text-sm text-gray-500 dark:text-gray-400"
            onChange={handleFileChange}
          />
          <div className="flex mt-4 md:mt-6">
            <a
              href={props.assignment.AssignmentLink}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Assignment
            </a>
            {props.assignment.submitted ? (
              <span className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 bg-white rounded-lg border">
                Assignment Submitted
              </span>
            ) : (
              <button
                onClick={handleUploadAssignment}
                className={`py-2 px-4 ms-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none ${
                  isUploading || loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isUploading || loading}
              >
                {isUploading || loading ? "Submitting..." : "Submit Assignment"}
              </button>
            )}
          </div>
          {error && (
            <p className="mt-2 text-sm text-red-600">Error: {error.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
