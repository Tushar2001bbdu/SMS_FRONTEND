import React, { useContext, useEffect, useState } from "react";
import { getAssignmentsBySection } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import FacultyAssignmentCard from "./FacultyAssignmentCard";
import { RoleContext } from "../Context/RoleProvider";
import Image from "next/image";
import AddAssignmentModal from "./AddAssignmentModal";

interface RoleContextType {
  role: any;
  changeRole: (newRole: any, rollno: string, email: string) => void;
  email: string;
  rollNumber: string;
}

interface Props {
  section: string;
}

interface Assignment {
  rollno: string;
  title: string;
  assignmentLink: string;
  solutionLink: string;
  subject: string;
  section: string;
  assignmentDate: string;
  dueDate: string;
  marks: string;
  postedBy: string;
  submitted: boolean;
}

interface AssignmentList {
  getAssignmentsBySection: Assignment[];
}

const Page: React.FC<Props> = ({ section }) => {
  const role = useContext<RoleContextType | null>(RoleContext);
  const [addAssignment, setAddAssignment] = useState<boolean>(false);
  const rollNumber = role?.rollNumber;

  const { data, loading, error } = useQuery<AssignmentList | null>(getAssignmentsBySection, {
    variables: { section, postedBy: rollNumber },
  });

  const [assignments, setAssignments] = useState<Assignment[]>([]);

  useEffect(() => {
    if (data) {
      setAssignments(data.getAssignmentsBySection);
    }
  }, [data]);

  if (addAssignment) {
    return <AddAssignmentModal section={section} setIsOpen={setAddAssignment}/>;
  }
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-4">Error: {error.message}</div>;
  }
 

  return (
    <div className="flex h-full w-full items-center justify-center">
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {assignments?.map((element: Assignment,index:number) => (
          <FacultyAssignmentCard key={index} Assignment={element} section={section} />
        ))}
        <div className="h-full w-full flex items-center justify-center">
          <Image alt="Assignment Card" src="/assignment.png" height={128} width={128} className="h-20 w-auto" />
          <button
            onClick={() => setAddAssignment(true)}
            className="text-blue-500 hover:text-blue-700"
          >
            Add Assignment
          </button>
        </div>
      </section>
    </div>
  );
};

export default Page;
