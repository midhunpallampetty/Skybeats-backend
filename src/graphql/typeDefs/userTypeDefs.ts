import { gql } from "apollo-server-express";

const userTypeDefs = gql`
  type User {
    id: String!
    username: String!
    email: String!
    isBlocked:Boolean!
    createdAt: String
    updatedAt: String!
  }

  input SignupInput {
    username: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }
 
  type AuthPayload {
    accessToken: String!
    refreshToken: String!
    user: User!
  }
  type ResetResponse {
    message: String!
  }
     type ChangeResponse {
    message: String!
    status:Float!
  }
    type TokenRefreshPayload {
    accessToken: String!
  }
    type BlockResponse{
    message:String!
    }
  type Query {
    getUserList: [User!]!
    getUser(email: String!): User
    getUserById(userId:String!):User
  }

  type Mutation {
    requestPasswordReset(email: String!): ResetResponse!
    blockUser(id:String!):BlockResponse!
    changePassword(id: String!, oldpassword: String!, newpassword: String!): ChangeResponse!
    userSignup(username: String!, email: String!, password: String!): AuthPayload!
    resetPassword(token: String!, newPassword: String!): ResetResponse!
    verifyOtp(email: String!, otp: String!): AuthPayload!

    userLogin(email: String!, password: String!): AuthPayload!

    updateUser(id: ID!, username: String!, email: String!, password: String!): User

    addUser(id: ID, username: String!, email: String!, password: String!): User

    deleteUser(email: String!): Boolean!
  }
`;

export default userTypeDefs;
