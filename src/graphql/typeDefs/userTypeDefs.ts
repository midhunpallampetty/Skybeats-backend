import { gql } from "apollo-server-express";

const userTypeDefs = gql`
  # Define the User type with essential fields
  type User {
    id: String!
    username: String!
    email: String!
    isBlocked:Boolean!
    createdAt: String!
    updatedAt: String!
  }

  # Input type for signup
  input SignupInput {
    username: String!
    email: String!
    password: String!
  }

  # Input type for login
  input LoginInput {
    email: String!
    password: String!
  }
 
  # Payload type for authentication-related responses
  type AuthPayload {
    token: String!
    user: User!
  }
  type ResetResponse {
    message: String!
  }
    type BlockResponse{
    message:String!
    }
  # Define Query operations
  type Query {
    # Fetch list of all users
    getUserList: [User!]!
    # Fetch a specific user by email
    getUser(email: String!): User
  }

  # Define Mutation operations
  type Mutation {
    requestPasswordReset(email: String!): ResetResponse!
    blockUser(id:String!):BlockResponse!

# Reset password using a token
    # User signup operation
    userSignup(username: String!, email: String!, password: String!): AuthPayload!
    resetPassword(token: String!, newPassword: String!): ResetResponse!
    # Verify OTP to complete signup
    verifyOtp(email: String!, otp: String!): AuthPayload!

    # User login operation
    userLogin(email: String!, password: String!): AuthPayload!

    # Update an existing user's details
    updateUser(id: ID!, username: String!, email: String!, password: String!): User

    # Add a new user
    addUser(id: ID, username: String!, email: String!, password: String!): User

    # Delete a user by email
    deleteUser(email: String!): Boolean!
  }
`;

export default userTypeDefs;
