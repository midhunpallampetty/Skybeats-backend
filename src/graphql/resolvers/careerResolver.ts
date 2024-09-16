import { careerModel } from "../../models/careerModel";
import { careerInput } from "../interfaces/careerInput";
const careerResolver={
    Mutation:{
        createJob:async(_:{},args:{input:careerInput})=>{
            try{
              
                const data=new careerModel(args.input)
                const adding=data.save()
                return adding;
            }catch(error){
           console.log('failed adding data')
            }
        

        }
    },
    Query:{
        getJobs:async()=>{
            try{
                const jobs=await careerModel.find()
                return jobs
            }catch(error){
                console.log(`can't fetch data from the database`);
            }

        }
    },
}
export default careerResolver;