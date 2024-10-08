import { applyJobModel } from "../../models/applyJob";  // Ensure this is correctly named and imported
import { applyJobDTO } from "../interfaces/applyJobDTO";

const appliedJobResolver = {
  Mutation: {
    applyJob: async (_: {}, { input }: { input: applyJobDTO }) => {
      try {
        // Create a new application
        const newApplication = new applyJobModel({
          name: input.name,
          email: input.email,
          phone: input.phone,
          coverLetter: input.coverLetter,
          cv: input.cv,
          Date:new Date().toLocaleString()
        });

        // Save the application to the database
        const savedApplication = await newApplication.save();
        return savedApplication;
      } catch (error:any) {
        throw new Error('Error applying for job: ' + error.message);
      }
    },
  },
  Query:{
    getAllApplication:async(_:{})=>{
      try{
      const appliedJobs=await applyJobModel.find()
      return appliedJobs;
      }catch(error){
        console.log('error fetching data');
        
      }
    }
  }
};

export default appliedJobResolver;
