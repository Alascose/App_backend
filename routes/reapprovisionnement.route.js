import express from "express";
import { createReapprovisionnement } from "../controllers/reapprovisionnement.controller.js";
const router = express.Router();
router.post("/", createReapprovisionnement);
export default router;
