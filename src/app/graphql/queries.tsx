import { gql} from "@apollo/client";
export let getAssignmentsBySection=gql`
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
 