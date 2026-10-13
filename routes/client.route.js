import express from "express";
import { createClient, getClient } from "../controllers/client.controller.js";
const router = express.Router();
router.get("/", getClient);
router.post("/", createClient);
export default router;
