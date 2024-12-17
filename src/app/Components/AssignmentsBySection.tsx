import React, { useEffect, useState } from "react";
import { getAssignmentsBySection } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import FacultyAssignmentCard from "./facultyAssignmentCard";

interface Props {
  section: string;
}
interface Assignment {
  rollno: string;
  title: string;
  AssignmentLink: string;
  SolutionLink: string;
  subject: string;
  section: string;
  assignmentDate: string;
  dueDate: string;
  marks: string;
  postedBy: string;
  submitted: boolean;
}
interface assignmentList {
  getAssignmentsBySection: Assignment[];
}
const AssignmentsBySection: React.FC<Props> = ({ section }) => {
  const [assignments, setAssignments] = useState<any>();
  const { data, loading, error } = useQuery<assignmentList | null>(
    getAssignmentsBySection,
    {
      variables: { section },
    }
  );
  useEffect(() => {
    if (data!==undefined || data!==null) {
      console.log(data)
      setAssignments(data?.getAssignmentsBySection);
    }
  }, [data]);

  return (
    <div className="grid grid-cols-3 gap-4">
      {assignments?.map((element: Assignment, index: number) => {
        return(
        <div>
            <FacultyAssignmentCard Assignment={element} section={section} /></div>);
      })}
    </div>
  );
};

export default AssignmentsBySection;
