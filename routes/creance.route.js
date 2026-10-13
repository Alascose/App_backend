import express from "express";
import {
  getCreance,
  createCreance,
  editeCreance,
  deleteCreance,
} from "../controllers/creance.controller.js";
const router = express.Router();
router.get("/", getCreance);
router.post("/", createCreance);
router.put("/:id", editeCreance);
router.delete("/:id", deleteCreance);
export default router;
