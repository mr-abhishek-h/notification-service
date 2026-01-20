import { Queue } from "bullmq";
import redisConnection from "../config/redis.js";

const notificationQueue = new Queue("notification-queue",{
    connection:redisConnection,
});

export default notificationQueue;
