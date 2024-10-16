import { profiledetailModel } from "../../models/profileDetailsModel";
import { ProfileDTO } from "../interfaces/profileDTO";
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
            
        }
    }
}
export default profileDetailResolver;