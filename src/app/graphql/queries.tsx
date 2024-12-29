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
export const getLearningMaterialBySection=gql`
  query getLeaningMaterialsBySection($section: String!,$uploadedBy:String!) {
    getLearningMaterialsBySection(section: $section,uploadedBy:$uploadedBy) {
      title
      description
      subject
      fileUrl
      videoLink
    }
  }
`;
export const addAssignment=gql`
mutation addAssignment($input: Assignments!) {
  addAssignment(input:$input) {
    result
  }
}
`;

export const addStudyMaterial=gql`
mutation addLearningMaterial($input : LearningMaterial!){
  addLearningMaterial(input:$input) {
    title 
    subject
  }

}`