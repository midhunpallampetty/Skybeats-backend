import bcrypt from 'bcryptjs';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { AdminModel } from '../../models/adminModel';
import { Query } from 'type-graphql';
import { adminDTO } from '../interfaces/adminDTO';
import { ObjectId } from 'mongoose';
interface MyJwtPayload extends JwtPayload {
  role: string;
}
interface AuthorisedPayload {
  token: string;
}
// interface Admin{
//   _id:ObjectId;
//   email:string;
//   password:String;
//   adminType:String;
// }
interface Admin extends Document {
  email: string;
  password: string;
  adminType: string;
  _id:string
}
function generateAccessToken(adminId: string, adminType: string) {
  console.log(adminType, 'adminType')
  const payload = {
    id: adminId,
    role: adminType,
  };


  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: "15m" });
}

const generateRefreshToken = (adminId: string) => {
  return jwt.sign(
    { adminId },
    process.env.REFRESH_TOKEN_SECRET!, 
    { expiresIn: '7d' } 
  );
};
function verifyRefreshToken(token: string): { adminId: string } | null {
  try {
  
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!) as {
      adminId: string;
    };

    
    return {
      adminId: decoded.adminId,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Refresh token verification failed:", error.message);
    } else {
      console.error("An unknown error occurred during refresh token verification");
    }
    return null; 
  }
}
const adminResolver = {
  Mutation: {
    adminLogin: async (_: {}, { email, password, adminType }: adminDTO) => {
      try {
    
        const admin: Admin | null  = await AdminModel.findOne({ email });
        if (!admin) {
          throw new Error("Unable to find admin");
        }

        
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
          throw new Error("Incorrect password");
        }

      
        if (admin.adminType !== adminType) {
          throw new Error("Admin type does not match");
        }

  
        const adminaccessToken = generateAccessToken(admin._id, admin.adminType); 
        const adminrefreshToken = generateRefreshToken(admin._id);

        return {
          admin: {
            id: admin._id,
            email: admin.email,
            adminType: admin.adminType,
          },
          adminaccessToken,
          adminrefreshToken,
        };
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log("Failed to login as admin", error.message);
        } else {
          console.log("An unknown error occurred during admin login");
        }
        throw new Error("Login failed on admin side");
      }

    },
    adminrefreshToken: async (
      _: {},
      { adminrefreshToken }: { adminrefreshToken: string }
    ) => {
      try {
        
        const decoded = verifyRefreshToken(adminrefreshToken);
        if (!decoded) {
          throw new Error("Invalid or expired refresh token");
        }

        
        const { adminId } = decoded;

        
        const admin = await AdminModel.findById(adminId);
        if (!admin) {
          throw new Error("Admin not found");
        }

        
        const newAccessToken = generateAccessToken(
          admin._id.toString(),
          admin.adminType + ''
        );

        return {

          adminaccessToken: newAccessToken,
        };
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Failed to generate new access token:", error.message);
        } else {
          console.error("An unknown error occurred during token generation");
        }
        throw new Error("Token refresh failed");
      }

    },


    adminSignup: async (_: {}, { email, password, adminType }: adminDTO) => {
      try {
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new AdminModel({
          email,
          adminType,
          password: hashedPassword,
        });
        newUser.save()
        console.log('New user saved');
        return {
          admin: {
            email,
            password,
            adminType
          }
        }


      } catch (error) {
        console.log('Cant save user password');
      }

    }
  },
  Query: {
    isAuthorised: async (_: {}, payload: AuthorisedPayload) => {
      try {
        console.log(payload);
        const verifyToken = jwt.verify(payload.token, process.env.ACCESS_TOKEN_SECRET!)
        console.log(verifyToken)
        const { role } = verifyToken as MyJwtPayload;
        console.log("Received Unique Name:", role);
        return {
          message: role,
        };
      } catch (error: unknown) {
        console.log('an error occured')
      }



    },





  }


}
export default adminResolver;