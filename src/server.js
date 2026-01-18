import app from "./app.js";
import env from "../src/config/env.js"; 

app.listen(env.port,()=>{
    console.log(`Notification service running on port ${env.port}`);
});

