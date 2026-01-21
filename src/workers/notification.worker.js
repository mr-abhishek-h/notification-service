import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import { Worker } from "bullmq";
import redisConnection from "../config/redis.js";
import env from "../config/env.js";
import Event from "../models/event.model.js";

await mongoose.connect(env.mongoUri);

console.log("Worker connected to MongoDB");

const notificationWorker = new Worker(
  "notification-queue",
  async (job) => {
    const { eventId } = job.data;

    const event = await Event.findById(eventId);

    if (!event) {
      throw new Error("Event not found");
    }

    if (event.attempts >= 3) {
      console.error(`Event ${event._id} exceeded max attempts`);
      return;
    }

    try {
      event.status = "processing";
      event.attempts += 1;
      await event.save();

      console.log(`Processing event: ${event.type}`);
      console.log("Payload:", event.payload);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      event.status = "completed";
      await event.save();

      console.log(`Event ${event._id} processed successfully`);
    } catch (error) {
      event.status = "failed";
      event.lastError = error.message;
      await event.save();

      throw error;
    }
  },
  {
    connection: redisConnection,
  },
);

notificationWorker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

notificationWorker.on("failed", (job, err) => {
  console.error(`Job ${job?.id} failed:`, err.message);
});
