import express from "express";
import eventRoutes from "./routes/events.routes.js";

const app = express();

app.use(express.json());
app.use("/events",eventRoutes);

app.get("/health",(req,res)=>{
    return res.status(200).json(
        {
            status:"ok",
            message:"service working fine"
        }
    );
});

export default app;