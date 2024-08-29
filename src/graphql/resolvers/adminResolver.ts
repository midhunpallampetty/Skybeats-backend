import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AdminModel } from '../../models/adminModel';
import { Query } from 'type-graphql';
import { adminDTO } from '../interfaces/adminDTO';
const adminResolver={
    Mutation:{
        adminLogin: async (_: {}, { email, password, adminType }: adminDTO) => {
            try {
              const admin: any = await AdminModel.findOne({ email });
          
              if (!admin) {
                console.log('Admin not found or does not exist');
                throw new Error('Unable to find admin');
              }
          
              const isPasswordValid = await bcrypt.compare(password, admin.password);
              if (!isPasswordValid) {
                throw new Error('Incorrect password');
              }
          
              if (admin.adminType !== adminType) {
                throw new Error('Admin type does not match');
              }
          
              const token = jwt.sign(
                { adminid: admin._id ,role:admin.adminType},
                process.env.JWT_SECRET!,
                { expiresIn: '2h' }
              );
              console.log('Generated Web token:', token);
              console.log('Generated Web token:', jwt.decode(token));

          
              return {
                admin: {
                  id: admin._id,
                  email: admin.email,
                  adminType: admin.adminType,
                },
                token,
              };
            } catch (error:any) {
              console.log('Failed to login as admin', error.message);
              throw new Error('Login failed on admin side');
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
        const verifyToken=jwt.verify(payload.token,process.env.JWT_SECRET!)
        const {role}:any=verifyToken
        console.log("Received Unique Name:",role );

        return {
          message: role,
        };
      },


    


    }
 
  
}
export default adminResolver;