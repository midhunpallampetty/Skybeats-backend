import { applyJobModel } from "../../models/applyJob";  // Ensure this is correctly named and imported
import { applyJobDTO } from "../interfaces/applyJobDTO";
import { careerModel } from "../../models/careerModel";

const appliedJobResolver = {
  Mutation: {
    applyJob: async (_: {}, { input }: { input: applyJobDTO }) => {
      console.log(input);
      try {
        // Find the job post by designation
        const jobPost = await careerModel.findOne({ designation: input.jobPost });
    
        if (jobPost) {
          // Initialize usersApplied array if it doesn't exist
          if (!Array.isArray(jobPost.usersApplied)) {
            jobPost.usersApplied = [];
          }
    
          // Check if the user has already applied
          if (jobPost.usersApplied.includes(input.userId)) {
            throw new Error('User has already applied for this job');
          }
    
          // User hasn't applied, proceed with the application
          const newApplication = new applyJobModel({
            name: input.name,
            email: input.email,
            phone: input.phone,
            coverLetter: input.coverLetter,
            cv: input.cv,
            Date: new Date().toLocaleString(),
            userId: input.userId
          });
    
          // Save the new application
          const savedApplication = await newApplication.save();
    
          // Add userId to the usersApplied array and save the job post
          jobPost.usersApplied.push(input.userId);
          await jobPost.save();
    
          return savedApplication;
        } else {
          throw new Error('Job post not found');
        }
      } catch (error: any) {
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
