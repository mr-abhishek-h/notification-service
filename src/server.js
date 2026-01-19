import app from "./app.js";
import env from "../src/config/env.js"; 
import connectDatabase from "./config/database.js";

const startServer = async () => {
    try {
        await connectDatabase();

        app.listen(env.port,()=>{
            console.log(`Notification service running on port ${env.port}`);
        });
    } catch (error) {
        console.error("Failed to start server:",error.message);
        process.exit(1);
    }   
};

startServer();
