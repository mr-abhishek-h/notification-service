import {Redis} from "ioredis";
import env from "./env.js";

const redisConnection = new Redis({
    host : env.redisHost,
    port : env.redisPort,
    maxRetriesPerRequest : null,
});

export default redisConnection;