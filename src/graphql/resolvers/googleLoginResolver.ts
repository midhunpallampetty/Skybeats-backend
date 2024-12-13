import { UserModel } from '../../models/userModel';
import jwt from 'jsonwebtoken';
import { googleAuthModel } from '../../models/googleAuth';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../../utils/tokenUtils';

interface GoogleLoginInput {
  email: string;
  password: string;
  username: string;
}

const googleLoginResolver = {
  Mutation: {
    handleGoogleLogin: async (
      _: {},
      { input }: { input: GoogleLoginInput },
    ) => {
      const { email, password, username } = input;

      try {
        
        let user = await UserModel.findOne({ email });

        
        const token = jwt.sign({ userId: email }, process.env.JWT_SECRET!, {
          expiresIn: "1h",
        });
        const accessToken = generateAccessToken({ userId: email });
        const refreshToken = generateRefreshToken({ userId:email });
      const authData={email,token}
      const newAuth=new googleAuthModel(authData)
      newAuth.save()
        if (!user) {
          
          
          user = new UserModel({
            username: username,
            email: email,
            password: password,
            walletBalance:0,
            isBlocked:false,

          });
      console.log('user',user);
          
          await user.save();
        }

        
        const dataToReturn = {
          name: user.username,
          email: user.email,
          password: user.password,
          accessToken,
          refreshToken,
          id:user._id
        };
       console.log(dataToReturn,'data')
        return dataToReturn;
      } catch (error) {
        console.error('Error handling Google login:', error);
        throw new Error('Failed to handle Google login');
      }
    },
  },
};

export default googleLoginResolver;
