import { gql } from "apollo-server-express";
const adminTypedefs=gql`
type Admin{
id:ID!
email:String!
password:String!
adminType:String!
}
input LoginInput{
email:String!
password:String
adminType:String!
}
type isAuthorised {
    message: String!
  }
input SignupInput{
email:String!
password:String!
adminType:String!
}
type AuthPayload{
admin:Admin!
token:String

}

type Mutation{
adminSignup(email:String!,password:String!,adminType:String!):AuthPayload!
adminLogin(email:String!,password:String,adminType:String!):AuthPayload!

}
type Query{
    isAuthorised(token:String!): isAuthorised 

}





`;
export default adminTypedefs;
