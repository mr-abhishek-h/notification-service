import mongoose from "mongoose";

const eventSchema = new mongoose.Schema (
    {
        type : {
            type:String,
            required:true,
            index:true,
        },

        payload : {
            type:Object,
            required:true,
        },

        status : {
            type:String,
            enum: ["pending","processing","completed","failed"],
            default : "pending",
            index:true,
        },

        attempts : {
            type : Number,
            default:0,
        },

        lastError: {
            type:String,
        },
    },
    {
        timestamps:true,
    }
);

const Event = mongoose.model("Event",eventSchema);

export default Event;