import express from "express";
import {
  createDetteRembourse,
  getDetteRembourse,
} from "../controllers/detteRembourse.controller.js";
const router = express.Router();
router.get("/", getDetteRembourse);
router.post("/", createDetteRembourse);
export default router;
