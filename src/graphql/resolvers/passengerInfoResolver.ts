import { passengerInfoModel } from "../../models/passengersInfo";
interface PassengerInterface{
    _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  phone: string;
  passportNumber: string;
  lastUsed: string;
}
const passengerInfoResolver={
    Mutation:{
        savePassengerInfo:async(_:{},{input}:{input:PassengerInterface})=>{
           const {userId,firstName,lastName,middleName,email,phone,passportNumber}=input;
           console.log(input)
           const updatedDetails={
            ...input,
            lastUsed:new Date().toISOString(),
           };
           const saveInfo=await passengerInfoModel.findOneAndUpdate(
            { userId, firstName },
            updatedDetails,
            {new:true,upsert:true}

           )
           return saveInfo;
        }
    },
    Query: {
        getPassengerInfo: async (_: any, { userId }: { userId: string }) => {
          try {
            const passengerInfo = await passengerInfoModel.find({ userId });
            
            return passengerInfo || [];
          } catch (error) {
            console.error("Error fetching passenger info:", error);
            throw new Error("Failed to fetch passenger information");
          }
        },
      },
}
export default  passengerInfoResolver;