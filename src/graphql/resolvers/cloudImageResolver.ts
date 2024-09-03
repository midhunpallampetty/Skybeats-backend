import { cloudImageModel } from "../../models/cloudImageModel";
interface CloudInput{
    imageUrl:string
}
const cloudImageResolver={
    Mutation:{
     SaveImage:async(_:{},args:{input:CloudInput})=>{
       const {input}=args
       const Image=new cloudImageModel(input)
       const saveImage=await Image.save()
        return saveImage
     }
    },
    Query:{
        GetCloudImages:async()=>{
            try{
            const Images=await cloudImageModel.find()
            return Images
            }catch(error){
                console.log(`Can't Get Images From database`);
            }
        }
    },
}
export default cloudImageResolver;