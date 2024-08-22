import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config()
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_CONNECT+"");
        console.log('Mongodb connection Established');

    } catch (error) {
        console.log('connection failed due to tech', error);

    }

}
export default connectDB;