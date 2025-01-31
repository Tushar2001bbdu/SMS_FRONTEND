"use client";

import React, { useContext } from "react";
import { gql, useQuery } from "@apollo/client";
import StudentAssignment from "@/app/Components/StudentAssignment";
import { RoleContext } from "@/app/Context/RoleProvider";
interface RoleContextType {
  role: any;
  changeRole: (newRole: any, rollno: any, email: any) => void;
  email: any;
  rollNumber: any;
}
// GraphQL Query
const GET_ASSIGNMENTS = gql`
  query getAssignmentsByRollno($rollno: ID!) {
    getAssignmentsByRollno(rollno: $rollno) {
      rollno
      title
      AssignmentLink
      subject
      assignmentDate
      dueDate
      postedBy
      submitted
    }
  }
`;


interface Assignment {
  rollno: string;
  title: string;
  AssignmentLink: string;
  subject: string;
  assignmentDate: string;
  dueDate: string;
  postedBy: string;
  submitted: boolean;
}

type QueryResult = {
  getAssignmentsByRollno: Assignment[];
};

export default function Page() {
  let role = useContext<RoleContextType | null>(RoleContext);
  const rollno = role?.rollNumber;
  const { loading, error, data } = useQuery<QueryResult>(GET_ASSIGNMENTS, {
    variables: { rollno },
    skip: !rollno,
  });

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-4">Error: {error.message}</div>;
  }
  /*
  const headingStyle = {
    fontSize: "40px",
    fontWeight: 600,
    backgroundImage: "linear-gradient(to left, #553c9a, #b393d3)",
    color: "transparent",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
  };*/

  return (
    <div>
      <section className="text-2xl font-bold mb-6 text-center text-gray-800">
      Your Assignments
      </section>
      <section className="my-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data?.getAssignmentsByRollno.map((element, index) => (
          <StudentAssignment key={index} assignment={element} />
        ))}
      </section>
    </div>
  
  );
}
