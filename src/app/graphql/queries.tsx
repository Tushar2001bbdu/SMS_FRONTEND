import { gql} from "@apollo/client";
export let getAssignmentsBySection=gql`
  query getAssignmentsBySection($section: String!) {
    getAssignmentsBySection(section: $section) {
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
 