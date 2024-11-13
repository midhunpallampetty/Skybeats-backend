import { UserModel } from '../../models/userModel';
import jwt from 'jsonwebtoken';
import { googleAuthModel } from '../../models/googleAuth';
interface GoogleLoginInput {
  email: string;
  password: string;
  username: string;
}

const googleLoginResolver = {
  Mutation: {
    handleGoogleLogin: async (
      _: any,
      { input }: { input: GoogleLoginInput },
    ) => {
      const { email, password, username } = input;

      try {
        // Check if a user with the provided email already exists
        let user = await UserModel.findOne({ email });

        // Generate a JWT token with the user's email
        const token = jwt.sign({ userId: email }, process.env.JWT_SECRET!, {
          expiresIn: "1h",
        });
      const authData={email,token}
      const newAuth=new googleAuthModel(authData)
      newAuth.save()
        if (!user) {
          // If no user exists, create a new one
          
          user = new UserModel({
            username: username,
            email: email,
            password: password,
            walletBalance:0,
          });
      console.log('user',user);
          // Save the new user in the database
          await user.save();
        }

        // Prepare the user data to return, including the generated token
        const dataToReturn = {
          name: user.username,
          email: user.email,
          password: user.password,
          token,
          id:user._id
        };

        return dataToReturn;
      } catch (error) {
        console.error('Error handling Google login:', error);
        throw new Error('Failed to handle Google login');
      }
    },
  },
};

export default googleLoginResolver;
