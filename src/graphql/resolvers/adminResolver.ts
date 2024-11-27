import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AdminModel } from '../../models/adminModel';
import { Query } from 'type-graphql';
import { adminDTO } from '../interfaces/adminDTO';
function generateAccessToken(adminId: string, adminType: string) {
  console.log(adminType,'adminType')
  const payload = {
    id: adminId,
    role: adminType, // Attach the role (adminType)
  };


  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: "1m" });
}

const generateRefreshToken = (adminId: string) => {
  return jwt.sign(
    { adminId },
    process.env.REFRESH_TOKEN_SECRET!, // Separate secret for refresh tokens
    { expiresIn: '7d' } // Longer lifespan for refresh token
  );
};
function verifyRefreshToken(token: string): { adminId: string } | null {
  try {
    // Verify the token using the refresh token secret
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!) as {
      adminId: string;
    };

    // Return the decoded payload containing adminId
    return {
      adminId: decoded.adminId,
    };
  } catch (error: any) {
    console.error("Refresh token verification failed:", error.message);
    return null; // Return null if the token is invalid or expired
  }
}
const adminResolver={
    Mutation:{
        adminLogin: async (_: {}, { email, password, adminType }: adminDTO) => {
          try {
            // Find admin by email
            const admin: any = await AdminModel.findOne({ email });
            if (!admin) {
              throw new Error("Unable to find admin");
            }
        
            // Check password
            const isPasswordValid = await bcrypt.compare(password, admin.password);
            if (!isPasswordValid) {
              throw new Error("Incorrect password");
            }
        
            // Verify admin type
            if (admin.adminType !== adminType) {
              throw new Error("Admin type does not match");
            }
        
            // Generate tokens
            const adminaccessToken = generateAccessToken(admin._id, admin.adminType); // Includes role in token
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
          } catch (error: any) {
            console.log("Failed to login as admin", error.message);
            throw new Error("Login failed on admin side");
          }
          },
          adminrefreshToken: async (
            _: {},
            { adminrefreshToken }: { adminrefreshToken: string }
          ) => {
            try {
              // Step 1: Verify the refresh token
              const decoded = verifyRefreshToken(adminrefreshToken);
              if (!decoded) {
                throw new Error("Invalid or expired refresh token");
              }
      
              // Step 2: Retrieve adminId from the decoded token
              const { adminId } = decoded;
      
              // Step 3: Ensure the admin exists
              const admin = await AdminModel.findById(adminId);
              if (!admin) {
                throw new Error("Admin not found");
              }
               
              // Step 4: Generate a new access token
              const newAccessToken = generateAccessToken(
                admin._id.toString(),
                admin.adminType+''
              );
      
              return {
                
                adminaccessToken: newAccessToken,
              };
            } catch (error: any) {
              console.error("Failed to generate new access token:", error.message);
              throw new Error("Token refresh failed");
            }
          },
        
          
        adminSignup:async(_:{},{email,password,adminType}:adminDTO)=>{
            try{
                const hashedPassword=await bcrypt.hash(password,10)

                const newUser=new AdminModel({
                    email,
                    adminType,
                    password:hashedPassword,
                });
                newUser.save()
                console.log('New user saved');
                return {
                    admin:{
                        email,
                        password,
                        adminType
                    }
                }
                

            }catch(error){
                console.log('Cant save user password');
        }
            
        }
    },
    Query:{
      isAuthorised: async (_:{},payload:any) => {
        console.log(payload);
        const verifyToken=jwt.verify(payload.token,process.env.ACCESS_TOKEN_SECRET!)
        console.log(verifyToken)
        const {role}:any=verifyToken
        console.log("Received Unique Name:",role );

        return {
          message: role,
        };
      },


    


    }
 
  
}
export default adminResolver;