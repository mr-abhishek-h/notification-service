import dotenv from "dotenv";

dotenv.config();

const env = {
    port : process.env.PORT,
    nodeEnv:process.env.NODE_ENV,
    mongoUri : process.env.MONGO_URI,
};

if(!env.port){
    throw new Error("PORT is not defined in environment variables");
}

if(!env.mongoUri){
    throw new Error("MONGO_URI is not defined in enviornment variables");
}

export default env;