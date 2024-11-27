import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "../../models/userModel";
import mongoose from "mongoose";
import { sendOtpEmail, sendResetEmail } from "../../services/emailService";
import util from "util-functions-nodejs";
import { verifyOtpDTO } from "../interfaces/verifyOtpDTO";
import { SignupDTO } from "../interfaces/signupDTO";
import { userLoginDTO,passwordResetDTO } from "../interfaces/userLoginDTO";
import { profiledetailModel } from "../../models/profileDetailsModel";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../../utils/tokenUtils';

interface changePasswordDTO{
  id:string,
  oldpassword:string,
  newpassword:string,


}
const resolvers = {
  Mutation: {
    userSignup: async (_: {}, { username, email, password }: SignupDTO) => {
      try {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
          throw new Error("User already exists");
        }
    
        const otp = util.generateOtp(6);
        const otpExpiry = new Date(Date.now() + 15 * 60 * 1000);
        console.log(otp, "otp is here");
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const newUser = new UserModel({
          username,
          email,
          password: hashedPassword,
          otp,
          otpExpiry,
          isBlocked: false,
          walletBalance: 0,
        });
    
        await newUser.save();
        console.log("User Saved with credentials:", newUser);
    
        await sendOtpEmail(email, otp);
    
        // Generate tokens using utility functions
        const accessToken = generateAccessToken({ userId: newUser._id.toString() });
        const refreshToken = generateRefreshToken({ userId: newUser._id.toString() });
    
        // Store the refresh token in the database
        await UserModel.updateOne({ _id: newUser._id }, { refreshToken });
    
        return {
          user: {
            id: newUser._id,
            username: newUser.username,
            email: newUser.email,
          },
          
            accessToken,
            refreshToken,
          
        };
      } catch (error) {
        console.log("Error in Adding User:", error);
        throw new Error("Failed to add User");
      }
    },
    



    blockUser: async (_: {}, { id }: { id: string }) => {
      try {
        const user = await UserModel.findById(id);
        if (!user) {
          throw new Error('User not found');
        }
        
        user.isBlocked = !user.isBlocked;
        await user.save();
        
        return { message: user.isBlocked ? "User blocked successfully" : "User unblocked successfully" };
      } catch (error) {
        console.log(error);
        return { message: "An error occurred" };
      }
    },
    requestPasswordReset: async (_: {}, { email }: verifyOtpDTO) => {
      try {
        const resetToken = util.xKeyGenerator(10);
        const resetTokenExpiry = new Date(Date.now() + 7200000);
    
        const user = await UserModel.findOneAndUpdate(
          { email }, 
          { 
            resetPasswordToken: resetToken, 
            resetPasswordExpires: resetTokenExpiry 
          }, 
          { new: true, upsert: true } 
        );
    
        if (!user) {
          throw new Error("User not found or unable to update.");
        }
    
        const resetUrl = `http://localhost:3000/user/resetPassword?token=${resetToken}`;
    
        await sendResetEmail(email, resetUrl);
    
        return {
          message: "Password reset email sent. Please check your inbox.",
        };
    
      } catch (error) {
        console.log("Error while sending reset email:", error);
        throw new Error("Failed to send reset email");
      }
    },
    changePassword: async (_: {}, { id, oldpassword, newpassword }: changePasswordDTO) => {
      try {
        // Find the user by ID
        const user = await UserModel.findById(id);
        if (!user) {
          return {
            status: 404,          
            message: "User not found",
          };
        }
    
        // Compare the old password with the stored password
        const isPasswordCorrect = await bcrypt.compare(oldpassword, user.password);
        if (!isPasswordCorrect) {
          return {
            status: 400,
            message: "Incorrect old password",
          };
        }
    
        // Hash the new password
        const hashedNewPassword = await bcrypt.hash(newpassword, 10);
        user.password = hashedNewPassword;
    
        // Save the updated user with the new password
        await user.save();
    
        return {
          status: 200,
          message: "Password changed successfully!",
        };
      } catch (error) {
        console.log("Error in changing password:", error);
        return {
          status: 500,
          message: "Failed to change password",
        };
      }
    },
    
    
    verifyOtp: async (_: {}, { email, otp }:verifyOtpDTO ) => {
      try {
        const user = await UserModel.findOne({ email });
        if (!user) {
          throw new Error("User not found");
        }
        if (user.otp !== otp || user.otpExpiry! < new Date()) {
          throw new Error("OTP invalid or expired");
        }
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();
        const token = jwt.sign(
          { userId: user._id },
          process.env.JWT_SECRET!,
          { expiresIn: "1h" }
        );
        console.log(token, "token generated");
        return {
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
          },
          token,
        };
      } catch (error) {
        console.log("Error in OTP verification:", error);
        throw new Error("OTP verification failed");
      }
    },
   
    userLogin: async (_: {}, { email, password }: userLoginDTO) => {
      try {
        const user = await UserModel.findOne({ email });
        if (!user) {
          throw new Error("User not found");
        }
    
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
          throw new Error("Incorrect password");
        }
    
        if (user.isBlocked) {
          throw new Error("User is blocked. Please contact support.");
        }
    
        const accessToken = generateAccessToken({ userId: user._id.toString() });
        const refreshToken = generateRefreshToken({ userId: user._id.toString() });
    
        await UserModel.updateOne({ _id: user._id }, { refreshToken });
    
        console.log("Generated Tokens: Access Token and Refresh Token",accessToken,refreshToken);
    
        return {
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
            isBlocked: user.isBlocked,
          },
          
            accessToken,
            refreshToken,
          
        };
      } catch (error) {
        console.log("Error in Login:", error);
        throw new Error("Failed to login");
      }
    },
    
    refreshToken: async (_: any, { refreshToken }: { refreshToken: string }) => {
      const payload = verifyRefreshToken(refreshToken);
console.log('generating new accessToken')
      if (!payload) {
        throw new Error('Invalid or expired refresh token');
      }

      const accessToken = generateAccessToken({ userId: payload.userId });
      const newRefreshToken = generateRefreshToken({ userId: payload.userId });

      return { accessToken, refreshToken: newRefreshToken };
    },
    resetPassword: async (_: {}, { token, newPassword }:passwordResetDTO) => {
      try {
        const user = await UserModel.findOne({
          resetPasswordToken: token,
          resetPasswordExpires: { $gt: Date.now() }, 
        });

        if (!user) {
          throw new Error("Invalid or expired password reset token");
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined; 
        user.resetPasswordExpires = undefined;
        await user.save();

        return {
          message: "Password has been reset successfully!",
        };
      } catch (error) {
        console.log("Error in Password Reset:", error);
        throw new Error("Failed to reset password");
      }
    },
  },

  Query: {
    getUserList: async () => {
      try {
        const users = await UserModel.find();
        return users;
      } catch (error) {
        console.log("Error fetching users:", error);
        throw new Error("Failed to fetch users");
      }
    },
     

   
    getUser: async (_: {}, { email }: userLoginDTO) => {
      try {
        const user = await UserModel.findOne({ email });
        if (!user) {
          throw new Error("User not found");
        }
        return user;
      } catch (error) {
        console.log("Error fetching user:", error);
        throw new Error("Failed to fetch user");
      }
    },
    getUserById: async (_: {}, { userId }: { userId: string }) => {
      try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
          throw new Error("Invalid user ID format");
        }
        const user = await UserModel.findOne({ _id: userId });
        if (!user) {
          throw new Error("User not found");
        }
        return user;
      } catch (error) {
        console.log("Error fetching user:", error);
        throw new Error("Failed to fetch user");
      }
    },
    
  },
};

export default resolvers;
