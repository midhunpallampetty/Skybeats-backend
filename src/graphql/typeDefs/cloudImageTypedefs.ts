import { gql } from "apollo-server-express";
const cloudImageTypedefs=gql`
type Cloud{
imageUrl:String
}
input CloudInput{
imageUrl:String
}
type Mutation{
SaveImage(input:CloudInput!):Cloud!
}
type Query{
GetCloudImages:[Cloud!]!
}

`;

export default cloudImageTypedefs;