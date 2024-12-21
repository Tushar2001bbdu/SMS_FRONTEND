import { gql} from "@apollo/client";
export const getAssignmentsBySection=gql`
  query getAssignmentsBySection($section: String!,$postedBy:String!) {
    getAssignmentsBySection(section: $section,postedBy:$postedBy) {
      rollno
      title
      AssignmentLink 
      SolutionLink
      subject
      assignmentDate
      dueDate
      postedBy
      submitted
    }
  }
`;
export const addAssignment=gql`
mutation addAssignment($input: Assignments!) {
  addAssignment(input:$input) {
    response
  }
}
`;
 