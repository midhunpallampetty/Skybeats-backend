import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AdminModel } from '../../models/adminModel';
interface adminDTO{
    email:string,
     password:string,
     adminType:string
}
const adminResolver={
    Mutation:{
        adminLogin: async (_: any, { email, password, adminType }: adminDTO) => {
            try {
              // Find the admin by email
              const admin: any = await AdminModel.findOne({ email });
          
              if (!admin) {
                console.log('Admin not found or does not exist');
                throw new Error('Unable to find admin');
              }
          
              // Check if the password is valid
              const isPasswordValid = await bcrypt.compare(password, admin.password);
              if (!isPasswordValid) {
                throw new Error('Incorrect password');
              }
          
              // Check if the adminType matches
              if (admin.adminType !== adminType) {
                throw new Error('Admin type does not match');
              }
          
              // Generate JWT token
              const token = jwt.sign(
                { adminid: admin._id },
                process.env.JWT_SECRET!,
                { expiresIn: '2h' }
              );
              console.log('Generated Web token:', token);
          
              // Return admin info and token
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
          
        adminSignup:async(_:any,{email,password,adminType}:adminDTO)=>{
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
}
export default adminResolver;