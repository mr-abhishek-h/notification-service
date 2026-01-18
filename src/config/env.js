import dotenv from "dotenv";

dotenv.config();

const env = {
    port : process.env.PORT,
    nodeEnv:process.env.NODE_ENV,
};

if(!env.port){
    throw new Error("PORT is not defined in environment variables");
}

export default env;