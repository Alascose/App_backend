import express from "express";
import {
  createCreanceSolde,
  getCreanceSolde,
} from "../controllers/creanceSolde.controller.js";
const router = express.Router();
router.get("/", getCreanceSolde);
router.post("/", createCreanceSolde);
export default router;
