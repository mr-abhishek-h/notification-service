import mongoose  from "mongoose";
import env from "./env.js";

const connectDatabase = async () => {
    try {
        await mongoose.connect(env.mongoUri,{
            autoIndex : false,
        });
        console.log("MongoDB connected (notififcation-service");
    } catch (error) {
        console.error("MongoDB connection failed:",error.message);
        process.exit(1);
    }
};

export default connectDatabase;