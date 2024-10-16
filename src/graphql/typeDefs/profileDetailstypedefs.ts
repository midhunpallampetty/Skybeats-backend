import { gql } from "apollo-server-express";

const profileDetailstypedef=gql`
type Profile{
    userId:String
    gender:String
    contactNo:String
    currentAddress:String
    permananentAddress:String
    email:String
    birthday:String
}
input ProfileInput{
 userId:String
    gender:String
    contactNo:String
    currentAddress:String
    permananentAddress:String
    email:String
    birthday:String

}    

type Mutation{
addorUpdateProfile(input:ProfileInput!):Profile!
}
type Query{
getProfileDetails(userId:String!):Profile!
}


`;
export default profileDetailstypedef;