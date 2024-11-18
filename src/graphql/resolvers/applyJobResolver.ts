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
    },
     getApplicationsById : async (_: {}, input: { userId: String }) => {
      try {
          // Fetching all job applications by the specific user
          const applications = await applyJobModel.find({ userId: input.userId });
  
          if (!applications || applications.length === 0) {
              throw new Error(`No applications found for user with ID: ${input.userId}`);
          }
  
          // Format `createdAt` to local date format
          const formattedApplications = applications.map((application) => {
              const formattedCreatedAt = new Date(application.createdAt).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
              });
              return { ...application.toObject(), createdAt: formattedCreatedAt };
          });
  
          return formattedApplications;
      } catch (error) {
          console.error(`Error fetching applications for user ${input.userId}:`, error);
          throw new Error("Failed to fetch applications for the specified user");
      }
  },
    

  }
};

export default appliedJobResolver;
