import React, { useContext, useEffect, useState } from "react";
import { getAssignmentsBySection } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import FacultyAssignmentCard from "./FacultyAssignmentCard";
import { RoleContext } from "../Context/RoleProvider";
import Image from "next/image";
interface RoleContextType {
  role: any;
  changeRole: (newRole: any, rollno: any, email: any) => void;
  email: any;
  rollNumber: any | string;
}
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
  let role = useContext<RoleContextType | null>(RoleContext);
  const [addAssignment,setAddAssignment]=useState<String | null>("false")
  let rollNumber = role?.rollNumber;
  console.log("The roll number" + rollNumber);
  const [assignments, setAssignments] = useState<any>();
  const { data, loading, error } = useQuery<assignmentList | null>(
    getAssignmentsBySection,
    {
      variables: { section: section, postedBy: rollNumber },
    }
  );
  useEffect(() => {
    if (data !== undefined || data !== null) {
      console.log(data);
      setAssignments(data?.getAssignmentsBySection);
    }
  }, [data]);

  return (
    <div className="grid grid-cols-3 gap-4">
      {assignments?.map((element: Assignment, index: number) => {
        return (
          <div>
            <FacultyAssignmentCard Assignment={element} section={section} />
          </div>
        );
      })}
      <div className=" h-full w-full flex items-center justify-center">
      <Image
        alt="Assignment Card"
        src="/assignment.png"
        height={"128"}
        width={"128"}
        className="h-20 w-auto"
      />
      <a onClick={()=>{setAddAssignment("true")}}>Add Assignment</a>
      </div>
     
    </div>
  );
};

export default AssignmentsBySection;
