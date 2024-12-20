import React from "react";



interface Props {
    section: string; 
    Assignment: {
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
}


const FacultyAssignmentCard: React.FC<Props> = ({ section,Assignment }) => {
    let rollno="1210438058"
    return (
        <div className="rounded overflow-hidden shadow-lg flex flex-col">
            <a href="#"></a>
            <div className="relative p-2">
                <a href="#">
                    <img
                        className="w-1/2 bg-white"
                        src="https://cdn-icons-png.freepik.com/256/11265/11265088.png?semt=ais_hybrid"
                        alt="Assignments"
                    />
                    <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0"></div>
                </a>
                <a href="#!">
                    <div  className="text-xs absolute top-0 right-0 bg-indigo-600 px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
                    {Assignment.submitted?"Submiited":"Not Submiited"}
                    </div>
                </a>
            </div>
            <div className="px-6 py-4 mb-auto">
                <a
                    href={Assignment.AssignmentLink} target="_blank"
                    className="font-medium text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2"
                >
                    {Assignment.title} - {Assignment.rollno}
                </a>
                <p className="text-gray-500 text-sm">
                    {Assignment.subject}
                </p>
            </div>
            <div className="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
                <span className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
                    <a href= {Assignment.SolutionLink} target="_blank" className="ml-1">Solution Link</a>
                </span>

                <span className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
                    
                    <a className="ml-1">Mark Assignment</a>
                </span>
            </div>
        </div>
    );
};

export default FacultyAssignmentCard;
