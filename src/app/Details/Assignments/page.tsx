"use client";


import React from "react"
import { gql, useQuery } from "@apollo/client";
import StudentAssignment from "@/app/Components/StudentAssignment";

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
interface Assignment{
  rollno: string;
  title: string;
  AssignmentLink: string;
  subject: string;
  assignmentDate: string;
  dueDate: string;
  postedBy: string;
  submitted: boolean;
};

type QueryResult={
  getAssignmentsByRollno: Assignment[];
};

export default function Page() {
  const rollno = "1210437010"; // Replace with actual logic to get rollno if needed

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

  return (
    <div>
      <div className="my-3 grid grid-cols-3 gap-4">
        {data?.getAssignmentsByRollno.map((element, index) => (
          <StudentAssignment key={index} assignment={element} />
        ))}
      </div>
    </div>
  );
}
