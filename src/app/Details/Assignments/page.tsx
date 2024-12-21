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

// Define TypeScript types for the GraphQL query response
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
    return <div>Loading assignments...</div>;
  }

  if (error) {
    return <div>Error loading assignments: {error.message}</div>;
  }
  const headingStyle = {
    fontSize: "40px",
    fontWeight: 600,
    backgroundImage: "linear-gradient(to left, #553c9a, #b393d3)",
    color: "transparent",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
  };

  return (
    <div>
      <div className="text-center" style={headingStyle}> Your Assignments</div>
      <div className="my-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data?.getAssignmentsByRollno.map((element, index) => (
          <StudentAssignment key={index} assignment={element} />
        ))}
      </div>
    </div>
  
  );
}
