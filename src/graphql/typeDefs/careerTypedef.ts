import { gql } from "apollo-server-express";
const careerTypedefs=gql`
type Job{
id:ID
designation:String!
description:String!
Image:String!
}

input JobInput{
designation:String!
description:String!
Image:String!
}
type Mutation{
createJob(input:JobInput!):Job!
}
type Query{
getJobs:[Job!]!
}

`;
export default careerTypedefs;