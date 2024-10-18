import { profiledetailModel } from "../../models/profileDetailsModel";
import { ProfileDTO } from "../interfaces/profileDTO";
import { UserModel } from "../../models/userModel";
import { ObjectId } from "mongoose";
const profileDetailResolver={
    Mutation:{
        addorUpdateProfile:async(_:{},args:{input:ProfileDTO})=>{
            const input=args.input;
            try{
                console.log(input.userId,'sds')
                const userId=input.userId;
                const user=await profiledetailModel.findOne({userId})

                if(!user){
                    console.log(user,'user')
                    
                    const data=input;
                    const addData=new profiledetailModel(data)
                    const saveDB=addData.save()
                    return saveDB
                }else{
                    const updateData = await profiledetailModel.findByIdAndUpdate(user._id, input, { new: true });
                    return updateData;
                }
                
            }catch(error){
                console.log('error adding data')
            }
           
        }
    },
    Query:{
        getProfileDetails:async(_:{},userId:String)=>{
            try{
                const user=await profiledetailModel.findOne(userId)
              
                return user
            }catch(error){
                console.log('cannot find user ')
            }
            
        },
        getWalletDetails: async (_:{}, { userId }:any) => {
            try {
              const user = await UserModel.findOne({ _id: userId }, { walletBalance: 1, _id: 0 }); 
              
              if (!user) {
                throw new Error("User not found");
              }
      
              return { walletBalance: user.walletBalance };
            } catch (error:any) {
              console.log(`Can't perform operation: ${error.message}`);
              throw new Error("Error fetching wallet details");
            }
          },
    }
}
export default profileDetailResolver;