import dotenv from "dotenv";

dotenv.config();

const env = {
    port : process.env.PORT,
    nodeEnv:process.env.NODE_ENV,
    mongoUri : process.env.MONGO_URI,
    redisHost : process.env.REDIS_HOST,
    redisPort : process.env.REDIS_PORT,
};

if(!env.port){
    throw new Error("PORT is not defined in environment variables");
}

if(!env.mongoUri){
    throw new Error("MONGO_URI is not defined in enviornment variables");
}

if(!env.redisHost || !env.redisPort){
    throw new Error("Redis configuration missing");
}

export default env;