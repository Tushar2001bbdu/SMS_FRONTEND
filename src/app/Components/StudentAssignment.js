import React, { useState, useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { gql, useMutation } from "@apollo/client";
export default function StudentAssignment(props) {
    const [file, setFile] = useState(null);

    const context = useContext(AuthContext);

    const SUBMIT_ASSIGNMENT = gql`
    mutation submitAssignment($rollno: ID!, $title: String!) {
      submitAssignment(rollno: $rollno, title: $title) {
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

    const [updateSubmission, { loading, error, data }] = useMutation(SUBMIT_ASSIGNMENT, {
        variables: {
            rollno: props.assignment.rollno,
            title: props.assignment.title,
        },
    });



    const handleFileChange = async (event) => {
        setFile(event.target.files[0]);
        await context.getAssignmentUrl(
            `${props.assignment.subject}/${event.target.files[0].name}`
        );
    };
    const handleUploadAssignment = async () => {
        try {
            if (context.uploadUrl !== null) {
                await fetch(context.uploadUrl, {
                    method: "PUT",
                    body: file,
                    headers: {
                        "Content-Type": file.type,
                    },
                });
                context.setUploadUrl(null);
                updateSubmission();
                console.log("file has been submitted")
            }
        } catch (error) { }
    };
    return (
        <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div class="flex justify-end px-4 pt-4">
                <div class="flex flex-col items-center pb-10">
                    <img
                        class="w-24 h-24 mb-3 rounded-full shadow-lg"
                        src="/docs/images/people/profile-picture-3.jpg"
                        alt="Bonnie image"
                    />
                    <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                        {props.assignment.title}
                    </h5>
                    <span class="text-sm text-gray-500 dark:text-gray-400">
                        {props.assignment.subject}
                    </span>
                    <span>
                        <input
                            type="file"
                            className="text-sm text-gray-500 dark:text-gray-400"
                            placeholder="Choose Assignment File"
                            onChange={handleFileChange}
                        />
                    </span>
                    <div class="flex mt-4 md:mt-6">
                        <a
                            href={props.assignment.AssignmentLink}
                            class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            target="_blank"
                        >
                            View Assignment
                        </a>
                        {
                            props.assignment.submitted === false && <a
                                href="#"
                                class="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                onClick={handleUploadAssignment} >Submit Assignment
                            </a>

                        }
                        {
                            props.assignment.submitted === true && <a
                                href="#"
                                class="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            >   Assignment Submitted
                            </a>

                        }


                    </div>
                </div>
            </div>
        </div >
    );
}
