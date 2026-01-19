import express from "express";
import {ingestEvent} from "../controllers/events.controller.js";

const router = express.Router();

router.post("/",ingestEvent);

export default router;